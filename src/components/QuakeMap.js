import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import {bind} from '../utils/utils';

import MapView from 'react-native-maps';

import axios from 'axios';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 18;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// let nps_url = "https://api.geonet.org.nz/quake?MMI=";
var markers = [];

export default class QuakeMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: this.props.latitudeDelta,
                longitudeDelta: this.props.longitudeDelta,
                screenWidth: this.props.screenWidth,
            },
            markers: [],
            loading: true,
            error: null
        };


    }

    componentWillReceiveProps(nextProps) {

        if (this.props.type && this.props.type == "SliderMap") {


            this.loadMapInfo(nextProps)
        }

    }

    componentDidMount() {

        if (this.props.type && this.props.type == "SliderMap") {
            this.loadMapInfo("");
        } else {
            console.log('to do ');
        }

    }

    loadMapInfo(nextProps) {
        let self = this
        let url = self.props.nps_source
        console.log('url', url);


        if (nextProps) {
            url = url + nextProps.level;
        } else {
            url = url + self.props.level;
        }
        // let self = this
        // let url = nps_url + this.state.level;
        // console.log('level ',this.state.level)
        console.log('url', url);
        axios.get(url)
            .then(function (result) {
                console.log('url', url)
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
        backgroundColor: '#F5FCFB',
    },
    map: {
        width: SCREEN_WIDTH,
        height: 500,
    },

})