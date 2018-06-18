import React from 'react';
import axios from 'axios';

export default class ChatList extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			chatList: []
		};

		this.getList({});
	}

	getList(params){
		axios.get("/chats", params).then((response) => {
			this.setState({chatList: response.data});
		});
	}

	renderChatList(){
		var list = this.state.chatList.map((chat) => {
			return <li key={chat.id}>{chat.name}</li>
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