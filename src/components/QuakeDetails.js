import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const QuakeDetails = ({quake}) => (
    <View style={styles.quake}>

        <View style={styles.info}>
            <Text style={styles.name}>
                {`${quake.properties.locality.toUpperCase()}`}
            </Text>
            <Text>
                <Text style={styles.fontBold}>Phone: </Text>
                {quake.cell}
            </Text>
            <Text>
                <Text style={styles.fontBold}>Email: </Text>
                {quake.email}
            </Text>
            <Text>
                <Text style={styles.fontBold}>Location: </Text>
                {quake.properties.locality}
            </Text>

        </View>
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
        padding: 5,
        backgroundColor: '#FFFFFF'
    },
    cover: {
        flex: 1,
        height: 150,
        marginTop: 40,
        resizeMode: 'contain'
    },
    info: {
        flex: 3,
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 20
    },
    name: {
        alignSelf: 'center',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222'
    },
    fontBold: {
        fontWeight: '700'
    }
});

export default QuakeDetails;
