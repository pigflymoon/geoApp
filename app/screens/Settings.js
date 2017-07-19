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

import {bind} from '../utils/utils';


export default class Settings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,

        };
        bind(this)('renderLoadingView');
    }

    componentDidMount() {

    }

    onNotificationSetting = () => {
        console.log('navigation',this.props)
        this.props.navigation.navigate('Notification',{});
    };

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
                <List>
                    <ListItem
                              leftIcon={{
                                  name: 'map-marker',
                                  type: 'font-awesome',
                                  size: 35,
                              }}
                              title={`Notification`}
                              onPress={() => this.onNotificationSetting()}

                    />
                </List>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({});