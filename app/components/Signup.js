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
    ActivityIndicator,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get("window");

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';

// import background from '../images/signup_bg.png';
import background from '../images/cover_bg.png';
import mark from '../images/icon_mark.png';
import lockIcon from '../images/icon_lock.png';
import personIcon from '../images/icon_person.png';
import emailIcon from '../images/icon_email.png';

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

    handleSignin = () => {
        Actions.signin();
    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    setName = (text) => {
        this.setState({name: text});
    }

    setPassword = (text) => {
        this.setState({password: text});
    }
    registerUserAndWaitEmailVerification(email, password) {
        var self = this;
        return new Promise(function (resolve, reject) {
            // let interval = null;
            console.log('new promise');
            firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(
                user => {
                    user.updateProfile({
                        displayName: self.state.name
                    });

                    Actions.verifyEmail({user: user, email: email});
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
                <Image source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={mark} style={styles.mark} resizeMode="contain"/>
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
                                <Image source={personIcon} style={styles.icon} resizeMode="contain"/>
                            </View>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor="#FFF"
                                style={styles.input}
                                onChangeText={(text) => this.setName(text)}
                                value={this.state.name}
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

                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignup}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.footerWrap}>
                            <Text style={styles.accountText}>Already have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                                <View>
                                    <Text style={styles.linkText}>Sign In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
    background: {
        width,
        height,
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
})