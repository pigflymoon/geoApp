import React, {Component} from 'react';

import {
    View,

} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {GiftedChat} from 'react-native-gifted-chat';

// import Backend from '../Backend';
import firebaseApp from '../config/FirebaseConfig';
// var uid = '';
// var messagesRef = null;

export default class ChatGroup extends Component {
    uid = '';
    messagesRef = null;

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
                console.log('user.uid', user.uid);
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

    loadMessages(callback) {
        console.log('load message')
        this.messagesRef = firebaseApp.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            console.log('message return', message)
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

        this.messagesRef.orderByValue().on("value", function (snapshot) {
            console.log("load messages There are " + snapshot.numChildren() + " messages");
        })
    }

    sendMessage(message) {
        // console.log('message',message);
        console.log('message', message);
        // var sessionsRef = firebaseApp.database().ref("messages");
        // console.log('Ref', sessionsRef);

        this.messagesRef.orderByValue().on("value", function (snapshot) {
            console.log("send messages There are " + snapshot.numChildren() + " messages");
        })

        for (let i = 0; i < message.length; i++) {
            console.log('message', message[i].createdAt);
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: message[i].createdAt,
            });
        }
    }

    componentDidMount() {
        this.setState({
            signin: true
        });

        this.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
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
