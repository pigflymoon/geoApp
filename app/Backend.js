import firebase from 'firebase';

class Backend {
    uid = '';
    messagesRef = null;
    // initialize Firebase Backend
    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB9fwkkRNv_iorCojjim82_p7G_oUlE3eM',
            authDomain: 'geochat-cc681.firebaseapp.com',
            databaseURL: 'https://geochat-cc681.firebaseio.com',
            storageBucket: 'geochat-cc681.appspot.com',
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
            } else {
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error.message);
                });
            }
        });
    }

    setUid(value) {
        this.uid = value;
    }

    getUid() {
        return this.uid;
    }

    // retrieve the messages from the Backend
    loadMessages(callback) {
        this.messagesRef = firebase.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            // console.log('name',message.user.name)
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
            });
            // console.log('saved users ',message.user.name);
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    // send the message to the Backend
    sendMessage(message) {

        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
            // console.log('messageRef',firebase.database().ref('messages'))
        }
        // console.log('messageRef',this.messagesRef)
    }

    // close the connection to the Backend
    /**
     * Calling off() on a parent listener will not automatically remove listeners registered on child nodes,
     * off() must also be called on any child listeners to remove the callback.
     */
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
}

export default new Backend();
