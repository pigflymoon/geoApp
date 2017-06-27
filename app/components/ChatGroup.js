import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {GiftedChat} from 'react-native-gifted-chat';
import firebase from 'firebase';  // Initialize Firebase
import firebaseApp from '../config/FirebaseConfig';

export default class ChatGroup extends Component {
    uid = '';
    messagesRef = null;

    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            messages: [],
            names: []
        };

        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user.displayName', user.displayName);
                this.setUid(user.uid);
                this.setName(user.displayName);
            } else {
                Actions.signin();
            }
        });
    }

    setUid = (value) => {
        this.uid = value;
    }

    getUid = () => {
        return this.uid;
    }

    setName = (value) => {
        this.displayName = value;
    }

    getName = () => {
        return this.displayName;
    }


    componentWillMount() {
    }

    loadMessages(callback) {
        this.messagesRef = firebaseApp.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            console.log('load messages', message.user.name)
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    sendMessage(message) {
        console.log('message', message)
        for (let i = 0; i < message.length; i++) {
            console.log('send message user', message[i].user)
            console.log('send message text', message[i].text)
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    componentDidMount() {
        this.setState({
            signin: true
        });

        this.loadMessages((message) => {
            console.log('Did mount message', message)
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
            console.log('messages', this.state.messages)
        });

    }

    componentWillUnmount() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    this.sendMessage(message);
                }}
                user={{
                    _id: this.getUid(),
                    name: this.getName()
                }}
            />


        );
    }


}

ChatGroup.defaultProps = {
    name: 'John Smith',
};

ChatGroup.propTypes = {
    name: React.PropTypes.string,
};
