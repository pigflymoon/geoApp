import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
    StyleSheet
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import axios from 'axios';
import {bind} from '../utils/utils';

var quakes;

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            isLoading: true
        };
        bind(this)('renderLoadingView')
    }

    componentDidMount() {
        // QuakesApi.getAllQuakes()
        axios.get(`https://api.geonet.org.nz/quake?MMI=0`)
            .then(res => {
                const filterData = [];
                quakes = res.data.features.reduce((array, value) => {
                    // if condition is our filter
                    if (value.properties.mmi >= 2) {
                        // what happens inside the filter is the map
                        let time = value.properties.time;
                        var utime = new Date(time);
                        utime = new Date(utime.toUTCString().slice(0, -4));
                        utime = utime.toString().split('GMT')[0];

                        time = new Date(time);
                        time = time.toString().split('GMT')[0];

                        value.utime = utime;
                        value.properties.time = time;
                        value.properties.magnitude = value.properties.magnitude.toFixed(1);
                        value.properties.depth = value.properties.depth.toFixed(1) + ' km';

                        array.push(value);
                    }
                    return array.slice(0, 10);
                }, filterData)

                this.setState({
                    dataSource: quakes,
                    isLoading: false
                })
            })

    }

    renderLoadingView() {
        return (
            <ScrollView>
                <Text>Loading...</Text>
            </ScrollView>
        )
    }


    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <ScrollView>
                <List >
                    {this.state.dataSource.map((quake, index) => (
                        <ListItem key={index}
                                  title={`NZST: ${quake.properties.time}`}
                                  subtitle={
                                      <View style={styles.info}>
                                          <Text>
                                              Magnitude: {quake.properties.magnitude}
                                          </Text>
                                          <Text>
                                              Depth: {quake.properties.depth}
                                          </Text>
                                          <Text>
                                              Locality: {quake.properties.locality}
                                          </Text>
                                      </View>
                                  }
                        />
                    ))}
                </List>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    info: {
        flex: 3,
        alignItems: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 20
    },

});