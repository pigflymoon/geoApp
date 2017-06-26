import React, {Component} from 'react';

import {
    View,

} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {GiftedChat} from 'react-native-gifted-chat';

// import Backend from '../Backend';
import firebaseApp from '../config/FirebaseConfig';
var uid = '';
var messagesRef = null;

export default class ChatGroup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
            messages: [],
            names: []
        };
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user', user);
                this.setUid(user.uid);
            } else {
                Actions.signin();
            }
        });
    }

    setUid(value) {
        this.uid = value;
    }

    getUid() {
        return this.uid;
    }


    componentWillMount() {
    }

    loadMessages() {
        this.messagesRef = firebaseApp.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            // console.log('name',message.user.name)
            this.setState((previousState) => {
                var messages = previousState.messages, names = [];
                for (var v of messages) {
                    if (!names.includes(v.user.name)) names.push(v.user.name);

                }

                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
            // callback({
            //     _id: data.key,
            //     text: message.text,
            //     createdAt: new Date(message.createdAt),
            //     user: {
            //         _id: message.user._id,
            //         name: message.user.name,
            //     },
            // });
            // console.log('saved users ',message.user.name);
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    sendMessage(message) {
        console.log('message',message);
        console.log('firebaseApp.database.ServerValue',firebaseApp.database.ServerValue);

        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebaseApp.database.ServerValue.TIMESTAMP,
            });
        }
    }

    componentDidMount() {
        this.setState({
            signin: true
        });

        this.loadMessages();

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
                    _id: this.getUid,
                    name: this.props.name,
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
