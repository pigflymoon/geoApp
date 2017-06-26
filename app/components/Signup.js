import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import {bind} from '../utils/utils';

import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
// import Backend from '../Backend';

export default class Signup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name:'',
            email: '',
            password: '',
        };
        bind(this)('signup');
    }

    signup() {
        Backend.signup(this.state.email, this.state.password);
        Actions.chat({
            name: this.state.name,
        });
    }

    componentDidMount() {


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
                <TextInput
                    placeholder='Please entry your nick name'
                    style={styles.textInput}
                    onChangeText={(text) => {
                        this.setState({
                            name: text,
                        });
                    }}
                    value={this.state.name}
                />

                <Button

                    backgroundColor="#397af8"
                    raised
                    title='Sign up'/>


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
