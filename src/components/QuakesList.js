import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    NavigatorIOS
} from 'react-native';

import {bind} from '../utils/utils';
import Quake from '../components/Quake';
import QuakeDetails from '../components/QuakeDetails';

class QuakesList extends Component {
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
                    <Quake quake={rowData}/>
                </View>
            </TouchableHighlight>
        )
    }

    rowOnPress(quake) {
        this.props.navigator.push({
            title: `${quake.name.first.toUpperCase()}`,
            component: QuakeDetails,
            passProps: {quake}
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

export default QuakesList;