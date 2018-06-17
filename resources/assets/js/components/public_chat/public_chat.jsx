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

        return (
            <div className="container">
                <Chat 
                    user={this.state.auth_user} 
                    postUrl={"/public_chat/store"}
                    channel={"public-chat-channel"}
                    eventName={"MessagePushed"}
                    port={":3000"}
                />
            </div>
        );
    }
}

if (document.getElementById('chat-view')) {
    ReactDOM.render(<PublicChat />, document.getElementById('chat-view'));
}