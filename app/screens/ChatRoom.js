import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ChatGroup from '../components/ChatGroup';
import LoginScreen from '../components/Login';
import {Actions} from 'react-native-router-flux';

export default class ChatRoom extends Component {

    render() {
        return (
            <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}
                    barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}

            >
                <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}

                >
                    <Scene key='chat' title='Chat' component={LoginScreen}
                           renderRightButton={
                               () => <TouchableOpacity onPress={
                                   () => {
                                       console.log('onRightPressed');
                                       Actions.signin();
                                   }
                               }>
                                   <Text>Sign out</Text>
                               </TouchableOpacity>
                           }
                    />
                    <Scene key='signin' title='Sign in' component={Signin}/>

                    <Scene key='signup' title='Sign up' component={Signup}


                    />

                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    // navBar: {
    //     backgroundColor: '#0D47A1',
    // },
    // navBarTitle: {
    //     color: '#FFFFFF'
    // },
    // barButtonTextStyle: {
    //     color: '#FFFFFF'
    // },
    barButtonIconStyle: {
        tintColor: 'rgb(255,255,255)'
    },
});