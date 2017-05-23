import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import QuakeMap from './QuakeMap';

const QuakeDetails = ({quake}) => (
    <View style={styles.quake}>

        <View style={styles.info}>

            <Text>
                <Text style={styles.fontBold}>Time: </Text>
                {quake.properties.time}
            </Text>
            <Text>
                <Text style={styles.fontBold}>Magnitude: </Text>
                {quake.properties.magnitude}
            </Text>
            <Text>
                <Text style={styles.fontBold}>Location: </Text>
                {quake.properties.locality}
            </Text>

        </View>
        <QuakeMap style={styles.map} mapInfo={quake}/>
    </View>
);

QuakeDetails.propTypes = {
    ...View.propTypes,
    quake: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    quake: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 40,
        // padding: 5,
        backgroundColor: '#FFFFFF'
    },

    info: {
        // flexGrow: 1,
        flexDirection: 'column',
        paddingTop: 40,
        paddingLeft: 10,
        alignSelf: 'flex-start',
    },

    fontBold: {
        fontWeight: '700'
    },
    map: {
        flexGrow: 4,
        flexDirection: 'column',
    }

});

export default QuakeDetails;
