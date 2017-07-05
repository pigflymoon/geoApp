import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("window");

import Icon from 'react-native-vector-icons/FontAwesome';
import background from '../images/cover_bg.png';
import lockIcon from '../images/icon_lock.png';
import emailIcon from '../images/icon_email.png';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
            names: []
        };
    }

    signup = () => {
        Actions.signup();
    }

    handleSignin = (e) => {
        var self = this;
        e.preventDefault()
        if (!this.state.email) {
            Alert.alert(
                'Oops',
                'Please enter your email',
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }

        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function (user) {
                firebaseApp.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log('********** In Sign in moudle********* ', user, ' is signed in');
                        Actions.chat();
                    } else {
                        console.log('error')
                    }
                })
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        Alert.alert(
                            'Oops',
                            errorMessage,
                            [
                                {text: 'OK'},
                            ],
                            {cancelable: false}
                        )
                        break;
                    default:
                        Alert.alert(
                            'Oops',
                            'Please try again',
                            [
                                {text: 'OK'},
                            ],
                            {cancelable: false}
                        )


                }

                console.log(error);
            });


    }

    setEmail = (text) => {
        this.setState({email: text});
    }


    setPassword = (text) => {
        this.setState({password: text});
    }

    handleResetPassword = () => {
        Actions.resetPassword();

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={background} style={styles.background} resizeMode="cover">
                    <View style={[styles.markWrap]}>
                        <View style={styles.circleIcon}>
                            <Icon name="sign-in" size={75} color="#4F8EF7" style={[styles.mark]}/>
                        </View>

                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={emailIcon} style={styles.icon} resizeMode="contain"/>
                            </View>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#FFF"
                                style={styles.input}
                                onChangeText={(text) => this.setEmail(text)}
                                value={this.state.email}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockIcon} style={styles.icon} resizeMode="contain"/>
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                placeholder="Password"
                                style={styles.input}
                                secureTextEntry
                                onChangeText={(text) => this.setPassword(text)}
                                value={this.state.password}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleResetPassword}>
                            <View>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.footerWrap}>
                            <Text style={styles.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.signup}>
                                <View>
                                    <Text style={styles.linkText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Image>
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
    markWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    circleIcon: {
        backgroundColor: "#ffffff",
        width: 150,
        height: 150,
        borderRadius: 150/2,
        alignItems: "center",
        justifyContent: "center",
    },

    wrapper: {
        paddingVertical: 30,
    },
    footerWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
    accountText: {
        color: "#D8D8D8"
    },
    linkText: {
        color: "#FFF",
        marginLeft: 5,
    }
});