import React from 'react';
import {
    Platform,
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import Login from '../components/Login';
import ChatGroup from '../components/ChatGroup';

export default class ChatRoom extends React.Component {
    render() {
        return (
            <Router>
                <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}>
                    <Scene key='login' title='Login' component={Login}/>
                    <Scene key='chat' title='Chat' component={ChatGroup}/>
                </Scene>
            </Router>
        );
    }
}