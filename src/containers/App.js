import React, {Component} from 'react';
import {
    StyleSheet,
    TabBarIOS,
    MapView
} from 'react-native';
import {bind} from '../utils/utils';

import QuakesTab from './QuakesTab';
import NewsTab from './NewsTab';
import MapViewTab from './MapViewTab';

const quakesIcon = 'data:image/png;base64,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';
const newsIcon = 'data:image/png;base64,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';
const mapIcon = 'data:image/png;base64,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';
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedTab: 'map'
        };
        bind(this)('mapOnPress', 'quakesOnPress', 'newsOnPress');
    }

    quakesOnPress() {
        this.setState({
            selectedTab: 'quakes'
        })
    }

    newsOnPress() {
        this.setState({
            selectedTab: 'news'
        })
    }

    mapOnPress() {
        this.setState({
            selectedTab: 'map'
        })
    }


    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    title="Map"
                    selected={this.state.selectedTab === 'map'}
                    icon={{url: mapIcon, scale: 14}}
                    onPress={this.mapOnPress}>
                    <MapViewTab/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Quakes"
                    selected={this.state.selectedTab === 'quakes'}
                    icon={{url: quakesIcon, scale: 5}}
                    badge="15"
                    onPress={this.quakesOnPress}>
                    <QuakesTab/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="News"
                    selected={this.state.selectedTab === 'news'}
                    icon={{url: newsIcon, scale: 14}}
                    badge="15"
                    onPress={this.newsOnPress}>
                    <NewsTab/>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default App;