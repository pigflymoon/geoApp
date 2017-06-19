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

import {bind} from '../utils/utils';
import PushController from '../components/PushController';
import QuakeLevelTab from '../components/QuakeLevelTab';
import QuakeLevelList from '../components/QuakeLevelList';

let nps_url = "https://api.geonet.org.nz/quake?MMI=";

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            level: 0
        };
        bind(this)('handleQuakeLevel')
    }

    handleQuakeLevel(level) {
        this.setState({
            level: level
        })
    }

    render() {
        return (
            <ScrollView>
                <QuakeLevelTab onQuakeLevel={this.handleQuakeLevel}/>
                <QuakeLevelList nps_source={nps_url} level={this.state.level}/>
                <PushController />
            </ScrollView>
        )
    }

}

