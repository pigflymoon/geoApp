import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    NavigatorIOS
} from 'react-native';

import {bind} from '../utils/utils';
import NewsItem from '../components/NewsItem';
import NewsDetails from '../components/NewsDetails';

class NewsList extends Component {
    constructor(props, context) {
        super(props, context);
        bind(this)('renderRow', 'rowOnPress')
    }

    static propTypes = {
        dataSource: PropTypes.object.isRequired,
        navigator: PropTypes.object.isRequired
    };

    renderRow(rowData, sectionId, rowId, highlightRow) {
        const rowHighlightOnPress = () => {
            this.rowOnPress(rowData);
            highlightRow(sectionId, rowId)
        };

        return (
            <TouchableHighlight onPress={rowHighlightOnPress}>
                <View style={styles.flex1}>
                    <NewsItem news={rowData}/>
                </View>
            </TouchableHighlight>
        )
    }

    rowOnPress(news) {
        this.props.navigator.push({
            title: `${news.title.toUpperCase()}`,
            component: NewsDetails,
            passProps: {news}
        })
    }

    render() {
        return (
            <ListView
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}/>
        )
    }


}

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    }
});

export default NewsList;