import React, {Component} from 'react'
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
    ActivityIndicator
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
            isLoading: false
        }
        ;
    }

    signin = () => {
        Actions.signin();
    }


    registerUserAndWaitEmailVerification(email, password) {
        var self = this;
        return new Promise(function (resolve, reject) {
            let interval = null;
            console.log('new promise');
            firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(
                user => {
                    user.updateProfile({
                        displayName: self.state.name
                    });

                    user.sendEmailVerification().then(
                        () => {
                            self.setState({
                                isLoading: true
                            });

                            // setTimeout(function () {
                            interval = setInterval(() => {
                                console.log('interval called?', user)
                                console.log('user.emailVerified?', user.emailVerified);
                                user.reload().then(
                                    () => {
                                        console.log('sign up user', user);
                                        if (interval && user.emailVerified) {
                                            clearInterval(interval);
                                            interval = null;
                                            resolve(user);
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
                                                Actions.verifyEmail({user: user, email: email});
                                            }

                                        }, 1000 * 10)
                                    }, error => {
                                        if (interval) {
                                            clearInterval(interval);
                                            interval = null;
                                            console.log('interval registerUserAndWaitEmailVerification: reload failed ! ' + error.message + ' (' + error.code + ')');
                                            reject(error);
                                        }
                                    }
                                );
                            }, 1000 * 30);
                            // }, 1000 * 20);

                        }, error => {
                            console.log('registerUserAndWaitEmailVerification: sendEmailVerification failed ! ' + error.message + ' (' + error.code + ')');
                            reject(error);
                        });
                }, error => {
                    console.log('registerUserAndWaitEmailVerification: createUserWithEmailAndPassword failed ! ' + error.message + ' (' + error.code + ')');
                    reject(error);
                }
            );
        });
    }

    handleSignup = (e) => {
        e.preventDefault();

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

            this.registerUserAndWaitEmailVerification(this.state.email, this.state.password);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ? (
                        <View style={styles.loading}>
                            <ActivityIndicator size='large'/>
                        </View>
                    ) : (<Image
                            source={background}
                            style={[styles.container, styles.bg]}
                            resizeMode="cover"
                        >
                            <View style={styles.headerContainer}>
                                <View style={styles.headerTitleView}>
                                    <Text style={styles.titleViewText}>Sign up</Text>
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
                                        autoFocus={true}
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
                                        ref='emailInput'
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

                                <TouchableHighlight onPress={this.handleSignup} underlayColor="white">
                                    <View style={styles.signup}>
                                        <Text style={styles.whiteFont}>Join</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableOpacity onPress={this.signin}>
                                    <View style={styles.signin}>
                                        <Text style={styles.greyFont}>Already have an account?<Text
                                            style={styles.whiteFont}>
                                            Sign In</Text></Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Image>
                    )}


            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 20,
        height: 20,
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
        // marginBottom: 15,
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