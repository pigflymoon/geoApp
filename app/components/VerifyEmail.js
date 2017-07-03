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

import background from '../images/login1_bg.png';

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
                                    console.log('to sign in? user', user)
                                    if (user && user.emailVerified) {
                                        console.log('auth state changed user emailVerified', user.emailVerified);
                                        Actions.chat({name: self.state.name});
                                    }
                                });


                            }
                            setTimeout(function () {
                                self.setState({
                                    isLoading: false
                                });
                                if (interval) {
                                    clearInterval(interval);
                                    interval = null;
                                    console.log('Time out');

                                }

                            }, 1000 * 10)
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

                                <View>
                                    <Text>{this.props.email}</Text>
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
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        color: '#fff',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#157EFB",//#FF3366
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    }
});