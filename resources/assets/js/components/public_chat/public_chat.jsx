import React from 'react';
import ReactDOM from 'react-dom';
import Chat from '../shared/chat.jsx';

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
        };

    }

    render() {
        var chatListView = "Log in now to see list of all chats!";

        if (this.state.auth_user){
            chatListView = "***List of Chats*****";
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <Chat 
                            user={this.state.auth_user} 
                            postUrl="/public_chat/store"
                            hostName={window.location.hostname}
                            channel="public-chat-channel"
                            eventName="MessagePushed"
                            port=":6001"
                            name="Public Chat"
                        />
                    </div>
                    <div className="col-md-4">
                        {chatListView}
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('chat-view')) {
    ReactDOM.render(<PublicChat />, document.getElementById('chat-view'));
}