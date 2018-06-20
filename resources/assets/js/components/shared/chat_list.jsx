import React from 'react';
import axios from 'axios';
import Echo from "laravel-echo";

export default class ChatList extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			chatList: []
		};

        //init the socket connection
        if (typeof io !== 'undefined') {
            this.state.echo = new Echo({
                broadcaster: 'socket.io',
                host: window.location.hostname + ":6001"
            });

            this.state.echo.channel("chat-created").listen("ChatCreated", this.chatCreatedReceived.bind(this));

            this.state.ioValid = true;

        }

		this.getList({});
	}

	chatCreatedReceived(response){
		let chat = response.chat;
        this.setState(
            {
                chatList: this.state.chatList.concat(chat)
            }
        );
	}

	getList(params){
		axios.get("/chats", params).then((response) => {
			this.setState({chatList: response.data});
		});
	}

	renderChatList(){
		var list = this.state.chatList.map((chat) => {
			return <li key={chat.id}><a href={"/chats/" + chat.id}>{chat.name}</a></li>
		});

		return <ul>{list}</ul>;
	}

	render(){
		return (
			<div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">Other Chats</div>
                        <div className="card-body">
                        	{this.renderChatList()}
                        </div>
                    </div>
                </div>
			</div>
		);
	}

}