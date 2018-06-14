import React from 'react';

export default class Chat extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            user: props.user,
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

        var user = this.state.user ? this.state.user.name : "anonymous"

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