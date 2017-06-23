import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ChatGroup from '../components/ChatGroup';
import {Actions} from 'react-native-router-flux';

export default class ChatRoom extends React.Component {

    render() {
        return (
            <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}
                    barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}

            >
                <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}

                >
                    <Scene key='signup' title='ChatRoom' component={Signup}


                    />
                    <Scene key='login' title='Login' component={Login}/>
                    <Scene key='chat' title='Chat' component={ChatGroup}
                           renderRightButton={
                               () => <TouchableOpacity onPress={
                                   () => {
                                       console.log('onRightPressed');
                                       Actions.login();
                                   }




                               }>
                                   <Text>logout</Text>
                               </TouchableOpacity>
                           }
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