import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';

import background from '../images/signup_bg.png';
import personIcon from '../images/signup_person.png';
import lockIcon from '../images/signup_lock.png';
import emailIcon from '../images/signup_email.png';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
        };
    }

    signin = () => {
        Actions.signin();
    }

    handleSignup = (e) => {
        e.preventDefault();
        var self = this;
        if (!this.state.email) {
            Alert.alert(
                'Oop',
                'Please enter your email',
                [
                    {text: 'OK'},
                ], {
                    cancelable: false,
                }
            )
        } else if (!this.state.password) {
            Alert.alert(
                'Oop',
                'Please set your password',
                [
                    {text: 'OK'},
                ], {
                    cancelable: false,
                }
            )
        } else {
            firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                // console.log('name', this.state.name);
                user.updateProfile({
                    displayName: self.state.name
                });
                // user.sendEmailVerification();
                // console.log('user', user);
            }).then(function () {
                // firebaseApp.auth().onAuthStateChanged(function (user) {
                //     if (user) {
                //         console.log('user', user)
                        Actions.chat({name: self.state.name});
                //     } else {
                //         console.log('error')
                //     }
                // })

            }).catch(function (error, userData) {
                // Handle Errors here.
                if (error) {
                    // console.log('error', error)
                    switch (error.code) {
                        case "auth/email-already-in-use":
                            alert("there already exists an account with the given email address.");
                            break;
                        case "auth/invalid-email":
                            alert("The email address is not valid");
                            break;
                        case "auth/operation-not-allowed":
                            alert("email/password accounts are not enabled");
                            break;
                        case "auth/weak-password":
                            alert("the password is not strong enough.");
                            break;

                        default:
                            alert("Error creating user:");
                    }

                } else {
                    alert('Your account was created!');
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={background}
                    style={[styles.container, styles.bg]}
                    resizeMode="cover"
                >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.titleViewText}>Sign Up</Text>
                        </View>

                    </View>

                    <View style={styles.inputsContainer}>

                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={personIcon}
                                    style={styles.inputIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <TextInput
                                style={[styles.input, styles.whiteFont]}
                                placeholder="Name"
                                placeholderTextColor="#FFF"
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => {
                                    this.setState({
                                        name: text,
                                    });
                                }}
                                value={this.state.name}
                            />
                        </View>

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
                                onChangeText={(text) => {
                                    this.setState({
                                        email: text,
                                    });
                                }}
                                value={this.state.email}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={lockIcon}
                                    style={styles.inputIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={[styles.input, styles.whiteFont]}
                                placeholder="Password"
                                placeholderTextColor="#FFF"
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text,
                                    });
                                }}
                                value={this.state.password}
                            />
                        </View>

                    </View>

                    <View style={styles.footerContainer}>

                        <TouchableOpacity onPress={this.handleSignup}>
                            <View style={styles.signup}>
                                <Text style={styles.whiteFont}>Join</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.signin}>
                            <View style={styles.signin}>
                                <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}>
                                    Sign In</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        paddingTop: 30,
        width: null,
        height: null
    },
    headerContainer: {
        flex: 1,
    },
    inputsContainer: {
        flex: 3,
    },
    footerContainer: {
        flex: 1
    },
    headerIconView: {
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    headerBackButtonView: {
        width: 25,
        height: 25,
    },

    headerTitleView: {
        backgroundColor: 'transparent',
        marginLeft: 25,
    },
    titleViewText: {
        fontSize: 40,
        color: '#fff',
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
        width: 30,
        height: 30,
    },
    input: {
        flex: 1,
        fontSize: 20,
    },
    signup: {
        backgroundColor: '#157EFB',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    signin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    greyFont: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: '#FFF'
    }
})