import React, { Component } from "react";
import ReactDOM, { findDOMNode } from 'react-dom';
import axios from "axios";
// import TextInput from 'react-autocomplete-input';
import Select from 'react-select';

class Trips extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: "",
            payerName: "",
            totalAmountPaid: 0,
            participantsOptions: [],
            participantOptionsPair: [],
            participants: []
        };
    }

    getAllExistingUsers = () => {
        axios.get("/user/allUsers/")
            .then(response => {
                let tempArray = [];
                console.log("lk;asdjf;laskjdfkl;asdjflkasdjf;klasd;lfasdlkf;askdlfasdfklasdf", response.data)
                // let tempArray = response.data
                response.data.forEach(element => {
                    let obj = {
                        value: element._id,
                        label: element.username
                    }
                    tempArray.push(obj)
                });

                this.setState({
                    participantsOptions: tempArray
                })
                // console.log("la;ksdjf;laksdfj;lkasdfj", this.state.participantsOptions)
                // return response.data
            })
    }

    handleSubmit = (currentUser) => event => {
        event.preventDefault();
        console.log("in here")
        // if(this.state.eventName !== "" && this.state.payerName !== "" &&  this.state.participants.length !== 0 && this.isParticipantsArrayEmpty){
        const eventToInsert = {
            userId: currentUser,
            payerId: this.state.payerName,
            amount: this.state.totalAmountPaid,
            eventName: this.state.eventName,
            paid: true,
            usersAttended: this.state.participants
        }
        console.log(eventToInsert);
        axios.post("/user/newEvent", eventToInsert).then(response => {
            console.log(response)
        })
        // }

    }

    isParticipantsArrayEmpty = () => {
        let returnBool = true;
        this.participant.forEach(element => {
            if (element === "") {
                returnBool = false;
                return;
            }
        });
        return returnBool;
    }

    handleSelectChange = (selectedOption) => {
        this.setState({ participants : selectedOption });
      }

    
    handleRequestOptions= event => {
        // event.preventDefault();
        // const target = event.target;
        // console.log(event);
        // const value = target.value;
        // console.log("TCL: Trips -> value", value)
        
        this.setState({
            tempName: event
        })
        console.log(`Requesting options for string: ${this.state.tempName}`);
    }

    handleText = i => e => {
        let participants = [...this.state.participants]
        participants[i] = e.target.value
        this.setState({
            participants
        })
        console.log("TCL: Trips -> participants", participants)
        
    }

    handleDelete = i => e => {
        e.preventDefault()
        let participants = [
            ...this.state.participants.slice(0, i),
            ...this.state.participants.slice(i + 1)
        ]
        this.setState({
            participants
        })
    }

    addParticipant = e => {
        e.preventDefault()
        let participants = this.state.participants.concat([''])
        console.log("in addParticipant", participants)
        this.setState({
            participants
        })
    }
    handleChangeEventInput = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        this.setState({
            eventName: value
        })
    }
    handleChangePayerNameInput = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        this.setState({
            payerName: value
        })
    }

    handleChangeTotalAmount = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        this.setState({
            totalAmountPaid: value
        })
        console.log(this.state.totalAmountPaid);
    }

    handleAddOption() {
        const nextOptions = this.state.participants;
    
        nextOptions.push(findDOMNode(this.refOptionField).value.trim());
        this.setState({ options: nextOptions });
      }

    componentDidMount() {
        this.getAllExistingUsers();
    }
    render() {
        const currentUser = this.props.currentUser
        return (
            <div className="col-xs-11 bg-light p-3 rounded col-lg-6 mx-auto text-left">
                <form>
                    <fieldset>
                        <legend className="text-center">Create An Event</legend>

                        <div className="form-group">
                            <label for="eventtName">Event Name:</label>
                            <textarea
                                className="form-control mb-3"
                                id="eventName"
                                placeholder="Dinner"
                                rows="1"
                                name="eventName"
                                onChange={this.handleChangeEventInput}
                            />
                        </div>

                        <div className="form-group">
                            <label for="payerFirstName">Payer First Name</label>
                            <textarea
                                className="form-control mb-3"
                                id="payerFirstName"
                                placeholder="John"
                                rows="1"
                                name="payerName"
                                onChange={this.handleChangePayerNameInput}
                            />
                        </div>

                        <label for="amount">Amount</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-secondary">$</span>
                            </div>
                            <input type="number" className="form-control" placeholder="USD" name="totalAmountPaid" onChange={this.handleChangeTotalAmount} />
                        </div>


                        <label for="payerFirstName">Additional Participant First Name(s)</label>
                        {/* <div className="mb-3">
                            {this.state.participants.map((participant, index) => (
                                <span key={index}>
                                    <input
                                        type="text"
                                        onChange={this.handleText(index)}
                                        value={participant}
                                    />
                                    <button className="btn-danger mb-2 btn-sm" onClick={this.handleDelete(index)}>X</button><br />
                                </span>
                            ))}
                            <button className="btn btn-dark text-light" onClick={this.addParticipant}>Add Participant</button>
                        </div> */}

                        <Select
                            defaultValue={[this.state.participantsOptions[2], this.state.participantsOptions[1]]}
                            isMulti
                            name="participantsList"
                            options={this.state.participantsOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={this.handleSelectChange}
                        />

                        {/* <div className="mb-3">
                            {this.state.participants.map((participant, index) => (
                                <span key={index}>
                                    <TextInput
                                        // type="text"
                                        options={this.state.participantsOptions}
                                        trigger={this.state.trigger}
                                        onRequestOptions={this.handleRequestOptions}
                                        // onChange={this.handleText(index)}
                                        value={participant}
                                    />
                                    <button className="btn-danger mb-2 btn-sm" onClick={this.handleDelete(index)}>X</button><br />
                                </span>
                            ))}
                            <button className="btn btn-dark text-light" onClick={this.addParticipant}>Add Participant</button>
                        </div> */}

                        {/* <div>
                            <TextInput
                                // disabled={this.state.disabled}
                                // style={{ width: '300px', height: '100px', display: 'block' }}
                                // maxOptions={parseInt(this.state.maxOptions, 10)}
                                onChange={this.handleRequestOptions}
                                options={this.state.participantsOptions}
                                regex={this.state.regex}
                                requestOnlyIfNoOptions={this.state.requestOnlyIfNoOptions}
                                spaceRemovers={eval(this.state.spaceRemovers)}
                                spacer={this.state.spacer}
                                trigger={this.state.trigger}

                            ></TextInput>
                            <button onClick={this.addParticipant}>Add</button>
                        </div> */}

                        {/* <div className="option-block">

                            <ul className='options'>
                                {this.state.participants}
                            </ul>
                            <div>
                                {/* <input ref={c => { this.refOptionField = c; }} /> }
                                <TextInput>
                                options={this.state.participantsOptions}
                                regex={this.state.regex}
                                requestOnlyIfNoOptions={this.state.requestOnlyIfNoOptions}
                                spaceRemovers={eval(this.state.spaceRemovers)}
                                spacer={this.state.spacer}
                                trigger={this.state.trigger}
                                </TextInput>
                            </div>
                            <button onClick={this.handleAddOption}>Add</button>
                        </div> */}

                        <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit(currentUser)}>
                            Submit
                        </button>

                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Trips;
