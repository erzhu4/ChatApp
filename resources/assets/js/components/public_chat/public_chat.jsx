import React from 'react';
import ReactDOM from 'react-dom';
import Chat from '../shared/chat.jsx';
import Echo from "laravel-echo"

window.io = require('socket.io-client');

if (typeof io !== 'undefined') {
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':3000'
    });
    window.Echo.channel('public-chat-channel').listen('MessagePushed', function (d) {
        console.log("I HEARD IT!!!");
    });

} else {
    console.log("larave echo server is not running");
}

export default class PublicChat extends React.Component {

    constructor(props){
        super(props);

        let auth_user = null;
        let user_str = document.getElementById("auth_user_meta").content;

        if (user_str.length){
            auth_user = JSON.parse(user_str);
        }

        this.state = {
            auth_user: auth_user
        }
    }

    render() {

        return (
            <div className="container">
                <Chat user={this.state.auth_user} postUrl={"/public_chat/store"} />
            </div>
        );
    }
}

if (document.getElementById('chat-view')) {
    ReactDOM.render(<PublicChat />, document.getElementById('chat-view'));
}