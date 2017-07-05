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
import firebase from 'firebase';

const {width, height} = Dimensions.get("window");

import Icon from 'react-native-vector-icons/FontAwesome';
import background from '../images/cover_bg.png';
import emailIcon from '../images/icon_email.png';
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
        };
    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    handleSignup = () => {
        Actions.signup();
    }

    handleResetPassword = () => {

        var auth = firebase.auth();
        var emailAddress = this.state.email;
        console.log('emailAddress', emailAddress)
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            console.log('reset password sent to the emailAddress');

            Actions.signin();
        }, function (error) {
            // An error happened.
            console.log('Error', error);
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={background} style={styles.background} resizeMode="cover">
                    <View style={[styles.markWrap]}>
                        <View style={styles.circleIcon}>
                            <Icon name="pencil" size={75} color="#4F8EF7" style={[styles.mark]}/>
                        </View>

                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Icon name="envelope-o" size={20}   style={styles.icon} />
                            </View>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#FFF"
                                style={styles.input}
                                onChangeText={(text) => this.setEmail(text)}
                                value={this.state.email}
                            />
                        </View>

                        <TouchableOpacity activeOpacity={.5} onPress={this.handleResetPassword}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Rest Password</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.container}>
                        <View style={styles.footerWrap}>
                            <Text style={styles.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignup}>
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
        backgroundColor:"transparent",
        color:"#CCC",
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
    footerWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    linkText: {
        color: "#FFF",
        marginLeft: 5,
    }
});