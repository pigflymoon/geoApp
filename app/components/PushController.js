import React, {Component} from 'react';
import {
    AppState,
    Text
} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notification: false,

        };

    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log('next props', nextProps.notification);
    //     this.setState({
    //         notification: nextProps.notification
    //     });
    //
    //     // console.log('in will receive props -----push controller notification', this.state.notification);
    //     // PushNotification.configure({
    //     //     onNotification: function (notification) {
    //     //         console.log('receive props NOTIFICATION:', notification);
    //     //
    //     //     },
    //     // });
    //
    // }

    componentDidMount() {
        // console.log('push controller notification', this.state.notification);
        var self = this;
        PushNotification.configure({
            permissions: {
                alert: false,
                badge: false,
                sound: true
            },

            onNotification: function (notification) {
                // console.log('notification userInteraction', notification.userInteraction);
                // console.log('NOTIFICATION:', notification);
                self.setState({notification: notification.userInteraction});
                // console.log('state notification', self.state.notification);
                // self.props.notification(self.state.notification);
                // notification.userInteraction = false;

            }
        });
        var notification = {
            "fireDate": new Date().getTime() + 60000,
            "alertBody": "Hello",
            applicationIconBadgeNumber: 0
        };

        PushNotification.scheduleLocalNotification(notification);
        console.log('notification',notification)
    }

    render() {
        // console.log('render?')
        return null;


    }
}