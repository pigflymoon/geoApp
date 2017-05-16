import React from 'react';
import {
    NavigatorIOS,
    StyleSheet
} from 'react-native';
import News from './News';


const NewsTab = ({props}) => (
    <NavigatorIOS
        style={styles.flex1}
        initialRoute={{
            title: 'News',
            component: News
        }}/>
);

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    }
});

export default NewsTab;