import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
const init_lng = 174.885971;
const init_lat = -40.900557;

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 18;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class QuakeMap extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Map</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >


                </MapView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFB'
    },
    map: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})