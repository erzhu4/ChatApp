import React from 'react';
import ReactDOM from 'react-dom';

export default class Example extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            entries: [
                {
                    author: "someone",
                    text: "testing entry"
                }
            ],

            inputValue: "test"
        }
    }

    handleInputText(val){
        console.log(val);
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
                                <div className="col-md-12"><textarea name="input-text" value={this.state.inputValue} onChange={this.handleInputText(e.target.value)} className="form-control"></textarea></div>
                                <br />
                                <div className="col-md-12"><button type="submit" className="btn btn-primary">Submit</button></div>
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