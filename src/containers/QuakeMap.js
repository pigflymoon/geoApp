import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import axios from 'axios';
import Callout from './Callout'

const init_lng = 174.885971;
const init_lat = -40.900557;

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 18;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let nps_url = "https://api.geonet.org.nz/quake?MMI=3";
var markers = [];
var coordinates = [], test = [];

export default class QuakeMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [{
                title: 'hello',
                coordinates: {
                    latitude: 3.148561,
                    longitude: 101.652778
                },
            },
                {
                    title: 'hello',
                    coordinates: {
                        latitude: 3.149771,
                        longitude: 101.655449
                    },
                }],
            loading: true,
            error: null
        };

    }


    componentDidMount() {
        axios.get(nps_url)
            .then(function (result) {
                for (let post of result.data.features) {
                    let time = post.properties.time;
                    var time = new Date(time);
                    time = time.toString().split('GMT')[0];
                    var marker = {
                        locality: post.properties.locality,
                        time: time,
                        depth: post.properties.depth.toFixed(1) + ' km',
                        magnitude: post.properties.magnitude.toFixed(1),
                        coordinates: {
                            longitude: post.geometry.coordinates[0],
                            latitude: post.geometry.coordinates[1]
                        }

                    };
                    /**
                     *   let time = post.properties.time;
                     let depth = post.properties.depth;
                     let magnitude = post.properties.magnitude;
                     */

                    markers.push(marker);
                } // for

                // markers['coordinates'] = coordinates;
                console.log('markers', markers)
            }); //then

        this.setState({
                markers: markers,
                loading: false,
                error: null
            }
        );


    }

    renderPosts() {
        if (this.state.error) {
            return this.renderError();
        }

        return (
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>
                {this.state.markers.map((marker, index) => (
                    <MapView.Marker
                        coordinate={marker.coordinates}
                        title={marker.locality}
                        description={`Time: ${marker.time}  Depth: ${marker.depth}  Magnitude: ${marker.magnitude}`}

                        key={index}

                    >

                    </MapView.Marker>
                ))}


            </MapView>
        );
    }

    renderLoading() {
        return <Text>Loading...</Text>;
    }

    renderError() {
        return (
            <Text>
                Uh oh: {this.state.error.message}
            </Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Map</Text>
                {this.state.loading ?
                    this.renderLoading()
                    : this.renderPosts()}
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
    },
    callout: {
        position: 'relative',
        fontSize: 8,
        width: 100,
    },
})