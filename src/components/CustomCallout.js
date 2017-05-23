import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
};

class CustomCallout extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.bubble}>
                    <View style={styles.amount}>
                        {this.props.children}
                    </View>
                </View>
                <View style={styles.arrowBorder}/>
                <View style={styles.arrow}/>
            </View>
        );
    }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        width: 140,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#81d4fa',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: '#4fc3f7',
        borderWidth: 0.5,
    },
    amount: {
        flex: 1,
         },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#81d4fa',
        alignSelf: 'flex-start',
        marginTop: -32,
        marginLeft: 50,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#4fc3f7',
        alignSelf: 'flex-start',
        marginTop: -0.5,
        marginLeft: 50,
    },
});

module.exports = CustomCallout;