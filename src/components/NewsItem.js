import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const NewsItem = ({news}) => {
    return (
        <View style={styles.news}>

            <View style={styles.info}>
                <Text style={styles.name}>
                    {`${news.title}`}
                </Text>
                <Text>
                    phone: {news.published}
                </Text>
                <Text>
                    {news.link}
                </Text>
            </View>
        </View>
    )
};

NewsItem.propTypes = {
    ...View.propTypes
};

const styles = StyleSheet.create({
    news: {
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

export default NewsItem;