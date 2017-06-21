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

export default class Login extends React.Component {
    state = {
        name: '',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.label, {marginTop: 40}]}>
                    Enter your name :
                </Text>

                <TextInput
                    placeholder='John Smith'
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
                                'Please enter your nameg',
                                [
                                    {text: 'OK'},
                                ],
                                { cancelable: false }
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
