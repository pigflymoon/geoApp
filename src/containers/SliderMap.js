import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import {bind} from '../utils/utils';

// import MapView from 'react-native-maps';
import QuakeSlider from '../components/QuakeSlider';
import QuakeMap from '../components/QuakeMap';

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

export default class SliderMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: LEVEL
        };
        bind(this)('handleChooseLevel')
    }

    handleChooseLevel(stat) {
        console.log('stat ', stat)
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

    render() {
        return (
            <View style={styles.container}>
                <Text>Map</Text>
                <QuakeMap type="SliderMap"
                          nps_source={nps_url} level={this.state.level}
                          latitude={LATITUDE}
                          longitude={LONGITUDE}
                          latitudeDelta={LATITUDE_DELTA}
                          longitudeDelta={LONGITUDE_DELTA}
                          screenWidth={SCREEN_WIDTH}
                />

                <View>

                    <QuakeSlider style={styles.label}
                                 onChooseLevel={this.handleChooseLevel}
                                 minimumValue={1}
                                 maximumValue={12}
                                 step={1}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFB',
    },
    map: {
        width: SCREEN_WIDTH,
        height: 500,
    },
    label: {
        width: SCREEN_WIDTH,
        height: 50,
        marginBottom: 50,

    }

})