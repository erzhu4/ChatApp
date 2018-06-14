import React from 'react';
import ReactDOM from 'react-dom';

export default class Example extends React.Component {

    constructor(props){
        super(props);

        let auth_user = null;
        let user_str = document.getElementById("auth_user_meta").content;

        if (user_str.length){
            auth_user = JSON.parse(user_str);
        }

        this.state = {
            auth_user: auth_user,
            entries: [],
            inputValue: ""
        }
    }

    handleInputText(event){
        this.setState({inputValue: event.target.value});
    }

    submitInput(event){
        var value = this.state.inputValue;
        if (value.length == 0) return;

        var user = this.state.auth_user ? this.state.auth_user.name : "anonymous"

        this.setState(
            {
                inputValue: "", 
                entries: this.state.entries.concat({author: user, text: value})
            }
        );    
    }

    render() {

        var entriesList = this.state.entries.map((el, idx) => {
            return <li key={idx}>{el.author}: {el.text}</li>
        });

        return (
            <div className="container">
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
            </div>
        );
    }
}

if (document.getElementById('chat-view')) {
    ReactDOM.render(<Example />, document.getElementById('chat-view'));
}