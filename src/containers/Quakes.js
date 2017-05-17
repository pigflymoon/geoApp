import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    NavigatorIOS
} from 'react-native';
import {bind} from '../utils/utils';
import QuakesList from '../components/QuakesList';

import axios from 'axios';
const init_lng = 174.885971;
const init_lat = -40.900557;

var quakes;


class Quakes extends Component {
    constructor(props, context) {
        //指定我们更新row的策略，一般来说都是prevRowData和nextRowData不相等时更新row
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props, context);
        this.state = {
            //为dataSource传递数据。如果是纯数组（无section），使用
            dataSource: ds.cloneWithRows([]),//该方法接收两个参数，dataBlob是原始数据源。在没有section的时候使用此方法，传入一个数组。
            // rowIdentities为可选类型，为数据源的每一项指明一个id。默认的id为字符串'0','1','2'...dataBlob.count。
            isLoading: true
        };
        bind(this)('renderLoadingView')
    }

    renderLoadingView() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    componentDidMount() {
        // QuakesApi.getAllQuakes()
        axios.get(`https://api.geonet.org.nz/quake?MMI=0`)
            .then(res => {
                const filterData = [];
                quakes = res.data.features.reduce((array, value) => {
                    // if condition is our filter
                    if (value.properties.mmi >= 2) {
                        // what happens inside the filter is the map
                        let time = value.properties.time;

                        time = new Date(time);
                        time = time.toString().split('GMT')[0];

                        value.properties.time = time;
                        value.properties.magnitude = value.properties.magnitude.toFixed(1);
                        value.properties.depth = value.properties.depth.toFixed(1) + ' km';
                        array.push(value);
                    }
                    return array.slice(0, 10);
                }, filterData)

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(quakes),
                    isLoading: false
                })
            })

    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>
                <QuakesList
                    dataSource={this.state.dataSource}
                    navigator={this.props.navigator}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
    }
});

export default Quakes;