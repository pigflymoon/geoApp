import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import {bind} from '../utils/utils';

import MapView from 'react-native-maps';
import QuakeSlider from '../components/QuakeSlider'

import axios from 'axios';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 18;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LEVEL = 4;

let nps_url = "https://api.geonet.org.nz/quake?MMI=";
var markers = [];

export default class QuakeMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: LEVEL,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            loading: true,
            error: null
        };
        bind(this)('handleChooseLevel')
    }

    handleChooseLevel(stat) {
        if (stat <= 3) {
            this.setState({level: 3})
        } else if (stat <= 4) {
            this.setState({level: 4})
        } else if (stat <= 5) {
            this.setState({level: 5})
        } else if (stat <= 6) {
            this.setState({level: 6})
        } else {
            this.setState({level: 7})
        }

    }

    componentDidMount() {
        let self = this
        let url = nps_url + 4;
        axios.get(url)
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


                <View>

                    <QuakeSlider style={styles.label}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFB',
    },
    map: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
    },
    label: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        justifyContent: 'flex-start',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

})