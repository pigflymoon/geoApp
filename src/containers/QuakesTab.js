import React from 'react';
import {
    NavigatorIOS,
    StyleSheet
} from 'react-native';
import Quakes from './Quakes';

const QuakesTab = ({props}) => (
    <NavigatorIOS
        style={styles.container}
        initialRoute={{
            title: 'Quakes list',
            component: Quakes
        }}/>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default QuakesTab;