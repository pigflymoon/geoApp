import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const Quake = ({quake}) => {
    return (
        <View style={styles.quake}>
            <Image style={styles.cover}
                   source={{uri: quake.picture.large}}/>
            <View style={styles.info}>
                <Text style={styles.name}>
                    {`${quake.name.first.toUpperCase()} ${quake.name.last.toUpperCase()}`}
                </Text>
                <Text>
                    phone: {quake.cell}
                </Text>
                <Text>
                    {quake.email}
                </Text>
            </View>
        </View>
    )
};

Quake.propTypes = {
    ...View.propTypes
};

const styles = StyleSheet.create({
    quake: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1
    },
    cover: {
        flex: 1,
        width: 150,
        height: 150,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    info: {
        flex: 3,
        alignItems: 'flex-end',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 20
    },
    name: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222'
    }
});

export default Quake;