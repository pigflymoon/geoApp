import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';
import QuakeMap from '../components/QuakeMap';
import QuakeSlider from '../components/QuakeSlider';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {bind} from '../utils/utils';

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width;

let nps_url = "https://api.geonet.org.nz/quake?MMI=";

export default class QuakesMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: 1
        };
        bind(this)('handleChooseLevel')
    }

    handleChooseLevel(stat) {
        // console.log('stat level is ',stat);
        if (stat <= 3) {
            this.setState({level: 3});
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
        backgroundColor: colors.grey6,
    },
    map: {
        width: SCREEN_WIDTH,
    },
    label: {
        width: SCREEN_WIDTH,
    }
})