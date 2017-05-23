import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import {bind} from '../utils/utils';

import QuakeSlider from '../components/QuakeSlider';
import QuakeMap from '../components/QuakeMap';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const LEVEL = 4;

let nps_url = "https://api.geonet.org.nz/quake?MMI=";

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
                />

                <View>

                    <QuakeSlider style={styles.label}
                                 onChooseLevel={this.handleChooseLevel}
                                 minimumValue={1}
                                 maximumValue={8}
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