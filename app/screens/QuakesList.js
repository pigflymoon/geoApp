import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
    Icon,
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
        console.log('data',this.state.dataSource.length);
        if(this.state.dataSource.length <= 0){
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
                });

            this.timer = setInterval(() => {
                console.log('I do not leak!');

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
            }, 1000 * 60 * 60 * 0.5);//

        }





    }

    renderLoadingView() {
        return (
            <ScrollView>
                <Text>Loading...</Text>
            </ScrollView>
        )
    }

    onQuakeDetail = (quake) => {
        this.props.navigation.navigate('Detail', {...quake});
    };

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <ScrollView>
                <List >
                    {this.state.dataSource.map((quake, index) => (
                        <ListItem key={index}
                                  leftIcon={{
                                      name: 'location-arrow',
                                      type: 'font-awesome',
                                      color:'red'
                                  }}
                                  title={`NZST: ${quake.properties.time}`}
                                  subtitle={
                                      <View style={styles.info}>
                                          <Text>Magnitude: {quake.properties.magnitude}</Text>
                                          <Text>Depth: {quake.properties.depth}</Text>
                                          <Text>Locality: {quake.properties.locality}</Text>
                                      </View>
                                  }

                                  onPress={() => this.onQuakeDetail(quake)}
                        />
                    ))}
                </List>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    info: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingTop: 10,
        // alignSelf: 'center',
        // paddingBottom: 20
    },

});