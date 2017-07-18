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
import PushNotification from 'react-native-push-notification';
var quakes;

export default class QuakeLevelList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            isLoading: true,
            timestamp: 0,
        };
        bind(this)('renderLoadingView');

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    fetchQuakes(nextProps) {
        let self = this
        let url = self.props.nps_source

        if (nextProps) {
            url = url + nextProps.level;
        } else {
            url = url + self.props.level;
        }
        axios.get(url)
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
                        var notificationTime = time.getTime();


                        time = time.toString().split('GMT')[0];

                        value.utime = utime;
                        value.properties.time = time;
                        value.properties.magnitude = value.properties.magnitude.toFixed(1);
                        value.properties.depth = value.properties.depth.toFixed(1) + ' km';
                        if (value.properties.mmi >= 2.8) {
                            AppState.addEventListener('change', this.handleAppStateChange);
                            timestamp['time' + notificationTime] = {
                                time: time,
                                magnitude: value.properties.magnitude,
                                location: value.properties.locality

                            };
                        }
                        array.push(value);

                    }

                    return array;
                }, filterData)

                this.setState({
                    timestamp: timestamp,
                    dataSource: quakes,
                    isLoading: false
                })
                // console.log('fetch data  timestamp', this.state.timestamp);

            });
    }

    componentWillReceiveProps(nextProps) {
            this.fetchQuakes(nextProps)

    }

    componentDidMount() {
        // console.log('in the app QuakesList data', this.state.dataSource.length);
        if (this.state.dataSource.length <= 0) {
            this.fetchQuakes();
        }
        //Every half hour call data api.
        this.timer = setInterval(() => {
            this.fetchQuakes();
            console.log('6min!')
        }, 1000 * 60);


    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }


    handleAppStateChange(appState) {
        if (appState === 'background') {
            if (Object.keys(this.state.timestamp).length > 0) {
                var timestamp = this.state.timestamp;
                // console.log(`notificatin is ${timestamp}`);

                for (var k in timestamp) {
                    // let date = new Date(timestamp[k]);
                    let message = `${timestamp[k].time} happened ${timestamp[k].magnitude} earthquake in ${timestamp[k].location}`;
                    PushNotification.localNotificationSchedule({
                        message: message,
                        date: new Date(),
                        number: 0,
                        userInteraction: true

                    });

                }
            }


            this.setState({
                timestamp: {},
                // notification: true
            });
        }

    }

    renderLoadingView() {
        return (
                <Text>Loading...</Text>
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

        )
    }

}

const styles = StyleSheet.create({
    info: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingTop: 10,
    },

});