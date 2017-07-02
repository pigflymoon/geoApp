import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';

import {bind} from '../utils/utils';
import firebaseApp from '../config/FirebaseConfig';

import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ChatGroup from '../components/ChatGroup';

export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {test: 1};
        bind(this)('signout');
    }

    signout() {
        firebaseApp.auth().signOut();
        Actions.signin();
    }

    render() {
        return (
            <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}
                    barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}
            >
                <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}>
                    <Scene key='chat' title='Chat' component={ChatGroup} hideNavBar={false} hideBackImage={true}
                           renderRightButton={
                               () => <TouchableOpacity
                                   onPress={this.signout}>
                                   <Text>Sign out</Text>
                               </TouchableOpacity>
                           }
                    />
                    <Scene key='signin' title='Sign in' component={Signin} hideNavBar={true}></Scene>
                    <Scene key='signup' title='Sign up' component={Signup}/>
                </Scene>
            </Router>
        )
            ;
    }
}

const styles = StyleSheet.create({
    barButtonIconStyle: {
        tintColor: 'rgb(255,255,255)'
    },
});