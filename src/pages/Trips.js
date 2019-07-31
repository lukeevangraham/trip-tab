import React, { Component } from "react";

class Trips extends Component {
  state = {
    participants: []
  };

  handleText = i => e => {
    let participants = [...this.state.participants]
    participants[i] = e.target.value
    this.setState({
      participants
    })
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
    this.setState({
      participants
    })
  }

  render() {
    return (
      <div className="col-xs-11 bg-light p-3 rounded col-lg-6 mx-auto text-left">
        <form>
          <fieldset>
            <legend className="text-center">Create An Event</legend>
            {/* <div className="form-group row">
      <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
      <div className="col-sm-10">
        <input type="text" readonly="" className="form-control-plaintext" id="staticEmail" value="email@example.com" />
      </div>
    </div>
    <div className="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
    </div>
    <div className="form-group">
      <label for="exampleSelect1">Example select</label>
      <select className="form-control" id="exampleSelect1">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    <div className="form-group">
      <label for="exampleSelect2">Example multiple select</label>
      <select multiple="" className="form-control" id="exampleSelect2">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div> */}

            <div className="form-group">
              <label for="eventtName">Event Name:</label>
              <textarea
                className="form-control mb-3"
                id="eventName"
                placeholder="Dinner"
                rows="1"
              />
            </div>

            <div className="form-group">
              <label for="payerFirstName">Payer First Name</label>
              <textarea
                className="form-control mb-3"
                id="payerFirstName"
                placeholder="John"
                rows="1"
              />
            </div>

            <label for="amount">Amount</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" className="form-control" placeholder="USD" />
            </div>


            <label for="payerFirstName">Additional Participant First Name(s)</label>
            <div className="mb-3">
              {this.state.participants.map((participant, index) => (
                <span key={index}>
                  <input
                    type="text"
                    onChange={this.handleText(index)}
                    value={participant}
                  />
                  <button className="btn-danger mb-2 btn-sm" onClick={this.handleDelete(index)}>X</button><br/>
                </span>
              ))}
              <button className="btn btn-secondary" onClick={this.addParticipant}>Add Participant</button>
            </div>

            {/* <div className="form-group">
              <label for="payerFirstName">Additional Participant</label>
              <textarea
                className="form-control mb-3"
                id="additionalParticipant1"
                placeholder="Suzy"
                rows="1"
              />
            </div> */}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Trips;
