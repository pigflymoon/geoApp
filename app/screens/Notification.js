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


export default class Notification extends Component {

    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {

    }



    render() {

        return (
            <ScrollView>
                <List>
                    <ListItem
                              leftIcon={{
                                  name: 'map-marker',
                                  type: 'font-awesome',
                                  size: 35,
                              }}
                              title={`Time`}


                    />
                </List>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({});