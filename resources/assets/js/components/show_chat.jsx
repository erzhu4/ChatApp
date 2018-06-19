import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './shared/chat.jsx';

window.io = require('socket.io-client');

var chat = JSON.parse(document.getElementById("chat-meta").content);

var usr_str = document.getElementById("auth_user_meta").content;

var user = null;

if (usr_str){
	user = JSON.parse(usr_str);
}

if (document.getElementById('show-chat')) {
    ReactDOM.render(<Chat 
	    	user={user} 
	    	postUrl={"/private_chat/store/" + chat.id}
			hostName={window.location.hostname}
            channel={"chat-" + chat.id}
            eventName="MessagePushed"
            port=":6001"
            name={chat.name}
    	/>, 
    	document.getElementById('show-chat'));
}