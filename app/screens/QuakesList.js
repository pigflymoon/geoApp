import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
    Icon,
    StyleSheet,
    AppState,
    Picker,
    Platform
} from 'react-native';

import {List, ListItem} from 'react-native-elements';
import axios from 'axios';
import {bind} from '../utils/utils';
import PushController from '../components/PushController';
import PushNotification from 'react-native-push-notification';

var quakes;

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            isLoading: true,
            time: 0,
        };
        bind(this)('renderLoadingView');

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        // QuakesApi.getAllQuakes()
        console.log('QuakesList data',this.state.dataSource.length);
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
                            if(value.properties.mmi >=3.5){
                                AppState.addEventListener('change', this.handleAppStateChange);
                                this.setState({
                                    time:new Date()
                                })
                            }
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

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }


    handleAppStateChange(appState) {
        if (appState === 'background') {
            console.log('time',this.state.time);
            let date = new Date(this.state.time);

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date: date,
                number: 0

            });
            console.log('hi notification');
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

                <Text style={styles.welcome}>
                    Choose your notification time in seconds.
                </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.seconds}
                    onValueChange={(seconds) => this.setState({seconds})}
                >
                    <Picker.Item label="5" value={5}/>
                    <Picker.Item label="10" value={10}/>
                    <Picker.Item label="15" value={15}/>
                </Picker>

                <Text style={styles.welcome}>
                    Choose your notification time in seconds.
                </Text>
                <PushController />

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