import React, {Component} from 'react'
import {
    NavigatorIOS,
    StyleSheet
} from 'react-native'
import SliderMap from './SliderMap';

const MapViewTab = ({props}) => (
    <NavigatorIOS
        style={styles.flex1}
        initialRoute={{
            title: 'Map',
            component: SliderMap
        }}/>
);

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    }
});

export default MapViewTab;