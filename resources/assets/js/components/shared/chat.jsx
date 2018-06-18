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
            tempUser: {
                name: null
            },
            errorMessage: null,
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

        // check input length
        if (value.length == 0 || !this.state.ioValid) return;

        //determine what the user is
        var user = this.state.user ? this.state.user : this.state.tempUser;

        //validate user
        if (!user.name || user.name.length < 1){
            this.setState({errorMessage: "Please identify with a name before sending a message!"});
            return;
        } else {
            this.setState({errorMessage: null});
        }

        //make the post request
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

    handleUserNameChange(event){
        var user = this.state.tempUser;
        user.name = event.target.value;
        this.setState({tempUser: user});    
    }

    render() {

        var entriesList = this.state.entries.map((el, idx) => {
            return <li key={idx}>{el.author.name}: {el.text}</li>
        });

        var userSetup;

        if (this.state.user){
            userSetup = <label>Logged in as: {this.state.user.name}</label>;
        } else {
            userSetup = <label>Your Name: <input className="form-control" onChange={this.handleUserNameChange.bind(this)} /></label>;
        }

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
                            <div style={{color:'red'}}>{this.state.errorMessage}</div>
                            <div className="row">
                                <div className="col-md-2">
                                    {userSetup}
                                </div>
                                <div className="col-md-8">
                                    <textarea name="input-text" value={this.state.inputValue} onChange={this.handleInputText.bind(this)} className="form-control" placeholder="Message...."></textarea>
                                </div>
                                <div className="col-md-2"><button type="submit" onClick={this.submitInput.bind(this)} className="btn btn-primary">Submit</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}