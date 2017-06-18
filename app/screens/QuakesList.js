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


import PushController from '../components/PushController';
import QuakeLevelTab from '../components/QuakeLevelTab';
import QuakeLevelList from '../components/QuakeLevelList';

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <ScrollView>
                <QuakeLevelTab />
                <QuakeLevelList/>
                <PushController />
            </ScrollView>
        )
    }

}

