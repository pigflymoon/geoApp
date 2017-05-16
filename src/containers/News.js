import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    NavigatorIOS
} from 'react-native';
import {bind} from '../utils/utils';
import NewsList from '../components/NewsList';

import axios from 'axios';


var news;

class News extends Component {
    constructor(props, context) {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props, context);
        this.state = {
            dataSource: ds.cloneWithRows([]),
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
        axios.get(`https://api.geonet.org.nz/news/geonet`)
            .then(res => {
                news = res.data.feed.map(function (item) {
                    if (item.published) {
                        item.published = item.published.slice(0, 10).replace(/-/g, "-")
                    }

                    return item;
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(news),
                    isLoading: false
                })
            });


    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>
                <NewsList
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

export default News;