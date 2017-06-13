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
            timestamp: 0,
            notification: false
        };
        bind(this)('renderLoadingView');
        // bind(this)('handleNotification')

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        // QuakesApi.getAllQuakes()
        console.log('in the app QuakesList data', this.state.dataSource.length);
        if (this.state.dataSource.length <= 0) {
            axios.get(`https://api.geonet.org.nz/quake?MMI=0`)
                .then(res => {
                    const filterData = [];
                    var timestamp = {};
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
                            if (value.properties.mmi >= 3.5) {
                                AppState.addEventListener('change', this.handleAppStateChange);


                                timestamp['time'+new Date().getTime()] = new Date().getTime();
                                console.log('timestamp is ',timestamp);
                                this.setState({
                                    timestamp: timestamp
                                });
                                console.log('fetch data  timestamp',this.state.timestamp);
                            }
                        }

                        return array.slice(0, 10);
                    }, filterData)

                    this.setState({
                        dataSource: quakes,
                        isLoading: false
                    })
                });




        }


    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }


    handleAppStateChange(appState) {
        if (appState === 'background' && this.state.notification == false) {
            var timestamp = this.state.timestamp;

            for(var value in timestamp){
                console.log('value is ',timestamp[value])
                let date = new Date(timestamp[value]);
                PushNotification.localNotificationSchedule({
                    message: "My Notification Message",
                    date: date,
                    number: 0,
                    userInteraction: true

                });
            }


            this.setState({
                // timestamp: date,
                notification: true
            });
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

    // handleNotification(notification) {
    //     console.log('push pass notification is ', notification);
    // }

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
                                      color: 'red'
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