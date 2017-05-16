import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const NewsDetails = ({news}) => (
    <View style={styles.news}>

        <View style={styles.info}>
            <Text style={styles.name}>
                {`${news.title.toUpperCase()} `}
            </Text>
            <Text>
                <Text style={styles.fontBold}>Phone: </Text>
                {news.published}
            </Text>
            <Text>
                <Text style={styles.fontBold}>Email: </Text>
                {news.link}
            </Text>

        </View>
    </View>
);

NewsDetails.propTypes = {
    ...View.propTypes,
    news: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    news: {
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

export default NewsDetails;
