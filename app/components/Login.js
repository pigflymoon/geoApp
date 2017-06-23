import React from 'react';
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

var names = [];
export default class Login extends React.Component {
    state = {
        name: '',
        names: []
    };

    componentDidMount() {
        Backend.loadMessages((message) => {
            var messages = message;
            for (var prop in messages) {
                if (prop == 'user') {
                    console.log('prop ', prop, messages[prop])
                    if (!names.includes(messages[prop].name)) {
                        names.push(messages[prop].name)
                    }
                }
            }

            this.setState({
                names: names
            });


            console.log('state names ', this.state.names);


        });


    }

    render() {
        console.log('passed names ', this.props.names);
        return (
            <View style={styles.container}>
                <Text style={[styles.label, {marginTop: 40}]}>
                    Enter your name :
                </Text>

                <TextInput
                    placeholder='Please entry your name'
                    style={styles.textInput}
                    onChangeText={(text) => {
                        this.setState({
                            name: text,
                        });
                    }}
                    value={this.state.name}
                />


                <Button
                    onPress={() => {
                        if (!this.state.name) {
                            Alert.alert(
                                'Oops',
                                'Please enter your name',
                                [
                                    {text: 'OK'},
                                ],
                                {cancelable: false}
                            )
                        } else if ((this.state.names).includes(this.state.name)) {
                            Alert.alert(
                                'Oops',
                                'Name already exist,please try a new one',
                                [
                                    {text: 'OK'},
                                ],
                                {cancelable: false}
                            )
                        } else {
                            Actions.chat({
                                name: this.state.name,
                            });
                        }

                    }}
                    backgroundColor="#397af8"
                    raised
                    title='Log in'/>


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
});
