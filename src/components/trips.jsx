import React, { Component } from 'react';

// import React, { Component } from 'react'
class Trips extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formControls: {
                event: {
                    value: '',
                    placeholder: 'What is your name',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3
                    }
                },
                yourName: {
                    value: ''
                },
                firstParticipant: {
                    value: ''
                },
                owed: {
                    value: '',
                    precision: 2,
                },
                paid: {
                    value: ''
                },
                remainder: {
                    value: ''
                }
            }
        }
    }

    // handleShareholderNameChange = idx => evt => {
    //     const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
    //         if (idx !== sidx) return shareholder;
    //         return { ...shareholder, name: evt.target.value };
    //     });

    //     this.setState({ shareholders: newShareholders });
    // };

    // handleSubmit = evt => {
    //     const { name, shareholders } = this.state;
    //     alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
    // };

    // handleAddShareholder = () => {
    //     this.setState({
    //         shareholders: this.state.shareholders.concat([{ name: "" }])
    //     });
    // };

    // handleRemoveShareholder = idx => () => {
    //     this.setState({
    //         shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    //     });
    // };


    render() {

        return (
            <div className="App">
                <p>Trip Information</p>
                <form onSubmit={this.handleSubmit}>
                    <label>Name of Event:</label>
                    <input type="text"
                        value={this.props.searchString}
                        ref="searchStringInput"
                        onchange={this.handleChange} />
                    <br /><br />

                    <label>Your Name:</label>
                    <input
                        type="text"
                        value={this.props.searchString}
                        ref="searchStringInput"
                        onchange={this.handleChange} />

                    <br /><br />
                    <label>Participant Name:</label>
                    <input
                        type="text"
                        value={this.props.searchString}
                        ref="searchStringInput"
                        onchange={this.handleChange} />
                    <br /><br />

                    <label> Amount Owed: $ </label>
                    <input
                        type="number"
                        value={this.props.searchString}
                        ref="searchStringInput"
                        onchange={this.handleChange} />

                    <br /><br />

                    Amount Paid: $
                    <input
                        type="number"
                        value={this.props.searchString}
                        ref="searchStringInput"
                        onchange={this.handleChange} />
                    <br /><br />

                    {/* {this.state.shareholders.map((shareholder, idx) => (
                        <div className="shareholder">
                            <input
                                type="text"
                                placeholder={`Shareholder #${idx + 1} name`}
                                value={shareholder.name}
                                onChange={this.handleShareholderNameChange(idx)}
                            />
                            <button
                                type="button"
                                onClick={this.handleRemoveShareholder(idx)}
                                className="small"
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={this.handleAddShareholder}
                        className="small"
                    >
                        Add Shareholder
        </button>
                    <button>Incorporate</button>
                    <button
                        type="button"
                        onClick={this.addNewParticipant}
                        className="small"
                   ></button> */}

                    <input type="submit" value="+Participant" />
                    <br /><br />

                    <input type="submit" value="SUBMIT" />
                    <br /><br />
                </form>
            </div>
        )

    }
}

export default Trips;