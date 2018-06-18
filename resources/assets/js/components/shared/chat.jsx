import React from 'react';
import axios from 'axios';
import Echo from "laravel-echo";
window.io = require('socket.io-client');

export default class Chat extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: props.user,
            postUrl: props.postUrl,
            entries: [],
            inputValue: "",
            name: props.name ? props.name : "Chat",
            ioValid: false
        };

        if (typeof io !== 'undefined') {
            window.Echo = new Echo({
                broadcaster: 'socket.io',
                host: props.hostName + props.port
            });

            window.Echo.channel(props.channel).listen(props.eventName, this.messageReceived.bind(this));

            this.state.ioValid = true;

        } else {
            console.log("larave echo server is not running");
        }
    }

    messageReceived(response){
        let data = response.data;
        if (data.socketId != window.Echo.socketId()){
            this.setState(
                {
                    entries: this.state.entries.concat({author: data.author, text: data.text})
                }
            );
        }
    }

    submitInput(event){
        var value = this.state.inputValue;
        if (value.length == 0 || !this.state.ioValid) return;

        var user = this.state.user ? this.state.user.name : "anonymous"

        axios.post(this.state.postUrl, {author: user, text: value, socketId: window.Echo.socketId(), test: "test"});

        var newState = {
            inputValue: "",
            entries: this.state.entries.concat({author: user, text: this.state.inputValue})
        };

        this.setState(newState);
    }

    handleInputText(event){
        this.setState({inputValue: event.target.value});
    }

    render() {

        var entriesList = this.state.entries.map((el, idx) => {
            return <li key={idx}>{el.author}: {el.text}</li>
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">{this.state.name}</div>

                        <div className="card-body">
                            <ul>
                                {entriesList}
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="col-md-12"><textarea name="input-text" value={this.state.inputValue} onChange={this.handleInputText.bind(this)} className="form-control"></textarea></div>
                            <br />
                            <div className="col-md-12"><button type="submit" onClick={this.submitInput.bind(this)} className="btn btn-primary">Submit</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}