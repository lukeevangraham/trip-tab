import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import { Form, Button, Container, Row, Col, Input } from 'reactstrap';
import "./trips.css"

// import React, { Component } from 'react'
class Trips extends Component {
    constructor(props) {
        super(props)
       this.state = {
            Controls: {
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
                    value: ''
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


    appendInput(e) {
        
            e.preventDefault();
            console.log(this.state.paid.value);
            
            return (
                <Container className="App">
                    <label>Participant Name:</label>
                    <input
                        type="text"
                        value={this.props.searchString}
                        ref="searchStringInput"
                        onChange={this.handleChange} />
                    <br /><br />

                    <label> Amount Owed: </label>
                    <CurrencyInput
                        prefix="$"
                        precision="2"
                        value={this.props.searchString}
                        ref="myinput"
                        onChange={this.handleChange} />

                    <br /><br />

                    <label> Amount Paid:</label>
                    <CurrencyInput
                        prefix="$"
                        precision="2"
                        value={this.props.searchString}
                        ref="myinput"
                        onChange={this.handleChange} />
                    <br /><br />
                </Container>
            )
        
    }


    render() {

        return (
            <Container className="App" text-align="center">
                <p>Trip Information</p>

                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md="12">
                            <label>Name of Event:</label>
                            <input type="text"
                                value={this.props.searchString}
                                ref="searchStringInput"
                                onChange={this.handleChange} />
                            <br /><br />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4"></Col>
                        <Col lg="4">
                            <label>Your Name:</label>
                            <input
                                type="text"
                                value={this.props.searchString}
                                ref="searchStringInput"
                                onChange={this.handleChange} />

                            <br /><br />
                        </Col>
                        <Col lg="4"></Col>
                    </Row>
                    <label>Participant Name:</label>
                    <input
                        type="text"
                        value={this.props.searchString}
                        ref="searchStringInput"
                        onChange={this.handleChange} />
                    <br /><br />

                    <label> Amount Owed: </label>
                    <CurrencyInput
                        prefix="$"
                        precision="2"
                        value={this.props.searchString}
                        ref="myinput"
                        onChange={this.handleChange} />

                    <br /><br />

                    <label> Amount Paid:</label>
                    <CurrencyInput
                        prefix="$"
                        precision="2"
                        value={this.props.searchString}
                        ref="myinput"
                        onChange={this.handleChange} />
                    <br /><br />

                    <button onClick={(e) => this.appendInput(e)}>
                        +PARTICIPANT
                    </button>

                    <br /><br />

                    <input id="submit" type="submit" value="SUBMIT" />

                </Form>
            </Container>
        )

    }
}

export default Trips;


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