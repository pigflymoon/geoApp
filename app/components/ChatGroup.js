import React, {Component} from 'react';

import {
    View,

} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {GiftedChat} from 'react-native-gifted-chat';

// import Backend from '../Backend';
import firebaseApp from '../config/FirebaseConfig';
export default class ChatGroup extends Component {
    state = {
        signin: false,
        messages: [],
        names: []
    };

    componentWillMount() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user',user)
            } else {
                Actions.signin();
            }
        });
        // if (!this.state.signin) {
        //     Actions.signin();
        // }
    }

    setUid(value) {
        this.uid = value;
    }


    render() {
        return (
            <GiftedChat
                messages={this.state.messages}

            />


        );
    }

    componentDidMount() {
        this.setState({
            signin: true
        });

    }

    componentWillUnmount() {
        // Backend.closeChat();

    }
}

ChatGroup.defaultProps = {
    name: 'John Smith',
};

ChatGroup.propTypes = {
    name: React.PropTypes.string,
};
