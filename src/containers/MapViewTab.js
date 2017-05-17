import React, {Component} from 'react'
import {
    NavigatorIOS,
    StyleSheet
} from 'react-native'
import QuakeMap from './QuakeMap';

const MapViewTab = ({props}) => (
    <NavigatorIOS
        style={styles.flex1}
        initialRoute={{
            title: 'Map',
            component: QuakeMap
        }}/>
);

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    }
});

export default MapViewTab;