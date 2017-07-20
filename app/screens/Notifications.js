import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    AppState,
    Picker,
    Platform,
    Switch,
    AsyncStorage,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

import colors from '../styles/colors';
import {bind} from '../utils/utils';


export default class Notifications extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isNotified: true,
            isSilenced: false,

        };

    }

    componentDidMount() {
        AsyncStorage.getItem("isNotified").then((value) => {
            var val = (value === "true");
            this.setState({"isNotified": val});
        }).done();
        AsyncStorage.getItem("isSilenced").then((value) => {
            var val = (value === "true");
            this.setState({"isSilenced": val});
        }).done();
    }


    toggleNotificationSwitch = (value) => {
        AsyncStorage.setItem("isNotified", value.toString());
        console.log('value is ', value)
        this.setState({"isNotified": value});

    }
    toggleDisturbSwitch = (value) => {
        AsyncStorage.setItem("isSilenced", value.toString());
        console.log('value is ', value)
        this.setState({"isSilenced": value});

    }

    render() {

        return (
            <ScrollView>
                <List>
                    <ListItem
                        hideChevron
                        title={`Notifications`}
                        switchButton
                        onSwitch={this.toggleNotificationSwitch}
                        switched={this.state.isNotified}

                    />
                    <ListItem
                        hideChevron
                        title={`Do not disturb`}
                        subtitle={'Notification that arrive during 22:00 to 8:00 will be silenced'}
                        subtitleStyle={{marginRight: 10,fontWeight:'normal'}}
                        c
                        switchButton
                        onSwitch={this.toggleDisturbSwitch}
                        switched={this.state.isSilenced}

                    />
                </List>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    rightTitleView: {
        // flexDirection: 'row',

        width: 100,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    switch: {
        // marginLeft: 20,
        // marginBottom: 10,
        // alignSelf: 'flex-end',
    }
});