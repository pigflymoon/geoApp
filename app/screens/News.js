import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    AppState,
    Picker,
    Platform
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import axios from 'axios';
import PushController from '../components/PushController';
import PushNotification from 'react-native-push-notification';

import {bind} from '../utils/utils';

var news;

export default class News extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            isLoading: false,
            seconds: 5,
        };
        bind(this)('renderLoadingView', 'goToURL');

        // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount() {
        if (this.state.dataSource.length <= 0) {
            axios.get(`https://api.geonet.org.nz/news/geonet`)
                .then(res => {
                    news = res.data.feed.map(function (item) {
                        if (item.published) {
                            item.published = item.published.slice(0, 10).replace(/-/g, "-")
                        }

                        return item;
                    });
                    this.setState({
                        dataSource: news,
                        isLoading: false
                    })
                });
            this.timer = setInterval(() => {
                axios.get(`https://api.geonet.org.nz/news/geonet`)
                    .then(res => {
                        news = res.data.feed.map(function (item) {
                            if (item.published) {
                                item.published = item.published.slice(0, 10).replace(/-/g, "-")
                            }

                            return item;
                        });
                        this.setState({
                            dataSource: news,
                            isLoading: false
                        })
                    });
            }, 1000 * 60 * 60 * 24);

        }
        // AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        // AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(Date.now() + (this.state.seconds * 1000));

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

    goToURL(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <ScrollView>

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
                <List>
                    {this.state.dataSource.map((news, index) => (
                        <ListItem
                            key={index}
                            title={news.title}
                            subtitle={news.published}
                            onPress={() => this.goToURL(news.link)}
                        />
                    ))}
                </List>
                <Text style={styles.welcome}>
                    Choose your notification time in seconds.
                </Text>
                <PushController />
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    picker: {
        width: 100,
    },
});