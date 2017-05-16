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
        this._goToURL = this._goToURL.bind(this);
    }


    render() {

        const {news} = this.props;

        return (

            <View style={styles.news}>

                <View style={styles.info}>
                    <Text style={styles.name}>
                        {`${news.title}`}
                    </Text>
                    <Text>
                        published: {news.published}
                    </Text>
                    <TouchableHighlight onPress={this._goToURL}  underlayColor="#a5a5a5">
                        <Text style={styles.title} >
                            Link: {news.title}
                        </Text>
                    </TouchableHighlight>

                </View>
            </View>

        );
    }

    _goToURL() {
        // const {news} = this.props;
        const link = this.props.news.link
        console.log(this.props)
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
        alignItems: 'flex-end',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 20
    },
    title: {
        color: 'blue'
    },
    name: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222'
    }
});

