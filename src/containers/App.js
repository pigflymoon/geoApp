import React, {Component} from 'react';
import {
    StyleSheet,
    TabBarIOS
} from 'react-native';
import {bind} from '../utils/utils';

import QuakesTab from './QuakesTab';
import NewsTab from './NewsTab';

const quakesIcon = 'data:image/png;base64,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';
const newsIcon = 'data:image/png;base64,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';
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedTab: 'quakes'
        };
        bind(this)('newsOnPress', 'quakesOnPress');
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

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    title="Quakes"
                    selected={this.state.selectedTab === 'quakes'}
                    icon={{url: quakesIcon, scale: 5}}
                    onPress={this.quakesOnPress}>
                    <QuakesTab/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="News"
                    selected={this.state.selectedTab === 'news'}
                    icon={{url: newsIcon, scale: 14}}
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