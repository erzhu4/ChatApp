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

	render(){
		return (
			<div className="row">
				This is the list component!
			</div>
		);
	}

}