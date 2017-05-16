import React, {Component, PropTypes} from 'react';
import {
    View,
    Linking,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class NewsItem extends Component {

    constructor() {
        super();
        this.goToURL = this.goToURL.bind(this);
    }


    render() {

        const {news} = this.props;

        return (

            <View style={styles.news}>

                <View style={styles.info}>
                    <TouchableHighlight onPress={this.goToURL} underlayColor="#eceff1">
                        <Text style={styles.name}>
                            {news.title}
                        </Text>
                    </TouchableHighlight>
                    <Text>
                        published: {news.published}
                    </Text>


                </View>
            </View>

        );
    }

    goToURL() {
        Linking.canOpenURL(this.props.news.link).then(supported => {
            if (supported) {
                Linking.openURL(this.props.news.link);
            } else {
                console.log('Don\'t know how to open URI: ' + this.props.news.link);
            }
        });
    }
}

const styles = StyleSheet.create({
    news: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1
    },
    info: {
        flex: 3,
        alignItems: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 20,
    },
    name: {
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222'
    }
});

