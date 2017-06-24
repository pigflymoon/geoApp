import React, {Component} from 'react';

import {
    View,

} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {GiftedChat} from 'react-native-gifted-chat';
import Backend from '../Backend';

export default class ChatGroup extends Component {
    state = {
        signin: false,
        messages: [],
        names: []
    };

    componentWillMount() {
        if (!this.state.signin) {
            Actions.signin();
        }
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    Backend.sendMessage(message);
                }}
                user={{
                    _id: Backend.getUid(),
                    name: this.props.name,
                }}
            />


        );
    }

    componentDidMount() {
        this.setState({
            signin: true
        });

        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                var messages = previousState.messages, names = [];
                for (var v of messages) {
                    if (!names.includes(v.user.name)) names.push(v.user.name);

                }

                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        });
    }

    componentWillUnmount() {
        Backend.closeChat();
    }
}

ChatGroup.defaultProps = {
    name: 'John Smith',
};

ChatGroup.propTypes = {
    name: React.PropTypes.string,
};
