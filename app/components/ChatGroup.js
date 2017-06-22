import React from 'react';
import {Actions} from 'react-native-router-flux';

import {GiftedChat} from 'react-native-gifted-chat';
import Backend from '../Backend';

export default class ChatGroup extends React.Component {
    state = {
        messages: [],
        names: []
    };

    componentWillMount() {

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
        // console.log('pass name', this.props.name)

        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                var messages = previousState.messages, names = [];
                for (var v of messages) {
                    if (!names.includes(v.user.name)) names.push(v.user.name);

                }
                // console.log('names',names)
                // Actions.login({
                //     names: names,
                // });
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
