import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableHighlight,
    ActivityIndicator,
    Dimensions,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("window");

import background from '../images/cover_bg.png';
import emailIcon from '../images/icon_email.png';

export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            isLoading: false,
            user: this.props.user,
        };
    }

    handleVerifyEmail = () => {
        let interval = null;
        var self = this;
        var user = this.state.user

        user.sendEmailVerification().then(
            () => {
                self.setState({
                    isLoading: true
                });

                interval = setInterval(() => {
                    console.log('interval called?', user)
                    console.log('user.emailVerified?', user.emailVerified);
                    user.reload().then(
                        () => {
                            console.log('sign up user', user);
                            if (interval && user.emailVerified) {
                                clearInterval(interval);
                                interval = null;

                                console.log('email sent');

                                firebaseApp.auth().onAuthStateChanged((user) => {
                                    self.setState({
                                        isLoading: false
                                    });
                                    console.log('to sign in? user', user)
                                    if (user && user.emailVerified) {
                                        console.log('auth state changed user emailVerified', user.emailVerified);
                                        Actions.chat({name: self.state.name});
                                    }
                                });

                            }
                        }, error => {
                            if (interval) {
                                clearInterval(interval);
                                interval = null;
                                console.log('interval registerUserAndWaitEmailVerification: reload failed ! ' + error.message + ' (' + error.code + ')');

                            }
                        }
                    );
                }, 1000 * 30);

            }, error => {
                console.log('registerUserAndWaitEmailVerification: sendEmailVerification failed ! ' + error.message + ' (' + error.code + ')');

            });
    }

    render() {
        return (

            <View style={styles.container}>
                {this.state.isLoading ? (
                        <View style={styles.loading}>
                            <ActivityIndicator size='large'/>
                        </View>
                    ) : (
                        <Image source={background} style={styles.background} resizeMode="cover">

                            <View style={styles.wrapper}>

                                <View style={styles.inputContainer}>
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={emailIcon}
                                            style={styles.inputIcon}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <TextInput
                                        style={[styles.input, styles.whiteFont]}
                                        placeholder="Email"
                                        placeholderTextColor="#FFF"
                                        value={this.props.email}
                                    />

                                </View>
                                <TouchableOpacity activeOpacity={.5} onPress={this.handleVerifyEmail}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                        </Image>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    background: {
        width,
        height,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputs: {
        paddingVertical: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        height: 75,
    },
    iconContainer: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIcon: {
        width: 20,
        height: 20,
    },
    input: {
        flex: 1,
        fontSize: 20,
    },

    button: {
        backgroundColor: '#157EFB',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    whiteFont: {
        color: '#FFF'
    },
});