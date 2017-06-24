import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';

import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import Backend from '../Backend';
import {bind} from '../utils/utils';


var names = [];
export default class Signin extends Component {
    state = {
        signin: false,
        email: '',
        password: '',
        name: '',
        names: []
    };

    componentDidMount() {
        console.log('signin ', this.state.email)
        // this.setState((previousState) => {
        // });

        // Backend.loadMessages((message) => {
        //     var messages = message;
        //     for (var prop in messages) {
        //         if (prop == 'user') {
        //             console.log('prop ', prop, messages[prop])
        //             if (!names.includes(messages[prop].name)) {
        //                 names.push(messages[prop].name)
        //             }
        //         }
        //     }
        //
        //     this.setState({
        //         names: names
        //     });
        //
        //
        //     console.log('state names ', this.state.names);
        //
        //
        // });


    }

    handleSignin = (e) => {
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
        // console.log('signin ', Backend.signin(this.state.email, this.state.password));
        if (Backend.signin(this.state.email, this.state.password)) {
            this.setState({
                signin: true
            });
            Actions.chat({
                name: this.state.name,
            });
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.label, {marginTop: 40}]}>
                    Enter your email :
                </Text>

                <TextInput
                    placeholder='Please entry your email'
                    style={styles.textInput}
                    onChangeText={(text) => {
                        this.setState({
                            email: text,
                        });
                    }}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Password"}
                />

                <View style={styles.button}>
                    <Button
                        style={styles.signup}
                        onPress={this.handleSignin}
                        backgroundColor="#397af8"
                        title='Sign up'/>

                    <Button
                        style={styles.signin}
                        onPress={this.handleSignin}
                        backgroundColor="#397af8"
                        title='Sign in'/>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',


    },
    label: {
        // flex: 1,
        fontSize: 20,
        alignSelf: 'center',

    },
    textInput: {
        height: 40,
        marginLeft: 50,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

});
