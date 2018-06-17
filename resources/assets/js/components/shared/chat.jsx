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
            ioValid: false
        };

        if (typeof io !== 'undefined') {
            window.Echo = new Echo({
                broadcaster: 'socket.io',
                host: window.location.hostname + props.port
            });
            window.Echo.channel(props.channel).listen(props.eventName, function (data) {
                let entry = data.data;
                this.setState(
                    {
                        entries: this.state.entries.concat({author: entry.author, text: entry.text})
                    }
                );
            }.bind(this));

            this.state.ioValid = true;

        } else {
            console.log("larave echo server is not running");
        }
    }

    submitInput(event){
        var value = this.state.inputValue;
        if (value.length == 0 || !this.state.ioValid) return;

        var user = this.state.user ? this.state.user.name : "anonymous"

        axios.post(this.state.postUrl, {author: user, text: value});

        this.setState(
            {
                inputValue: ""
                // entries: this.state.entries.concat({author: user, text: value})
            }
        );
    }

    handleInputText(event){
        this.setState({inputValue: event.target.value});
    }

    render() {

        var entriesList = this.state.entries.map((el, idx) => {
            return <li key={idx}>{el.author}: {el.text}</li>
        });

        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Chat Time!</div>

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