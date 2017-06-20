import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import News from '../screens/News';
import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import QuakeDetail from '../screens/QuakeDetail';
import Chat from '../screens/Chat';
export const QuakesListStack = StackNavigator({
    List: {
        screen: QuakesList,
        navigationOptions: {
            title: 'Quakes List'
        },
    },

    Detail: {
        screen: QuakeDetail,
        navigationOptions: ({navigation}) => ({
            title: 'Quake Detail'
        }),
    },
});


export const Tabs = TabNavigator({
    List: {
        screen: QuakesListStack,
        navigationOptions: {
            tabBarLabel: 'List',
            tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor}/>,
        },
    },
    Map: {
        screen: QuakesMap,

        navigationOptions: {
            tabBarLabel: 'Map',
            tabBarIcon: ({tintColor}) => <Icon name="room" size={35} color={tintColor}/>,
        },
    },
    News: {
        screen: News,
        navigationOptions: {
            tabBarLabel: 'News',
            tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
        },
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        },
    }
});

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
})