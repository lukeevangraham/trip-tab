import React, { Component } from "react";
import axios from "axios";
import EventCard from "../components/eventsCard";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import "../../../client/src/events.css";

Table.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  striped: PropTypes.bool,
  dark: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  // Custom ref handler that will be assigned to the "ref" of the inner <table> element
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object
  ])
};

const styles = {
  eventsHeader: {
    backgroundColor: "#1E7096"
  },
};

class Events extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    this.getEvents(this.props.username);
  }
  componentWillReceiveProps(props) {
    this.getEvents(props.username);
  }

  getEvents(username) {
    axios.get("user/newEvents/" + username).then(response => {
      this.setState({
        ...this.state,
        events: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <h4 className="text-center mb-3">{this.props.username}'s Events: </h4>

        <div className="row">
          <div className="col-md-11 mx-auto">
            <div className="card" style={styles.eventsHeader}>
              <table
                className="table table-hover lead w-100 d-block d-md-table"
              >
                <thead className="text-white" >
                  <tr className="text-white">
                    <th scope="col">Participants</th>

                    <th scope="col">Event Name</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.events.map(event => {
                    return (
                      <EventCard
                        username={event.userId}
                        eventname={event.eventName}
                        amount={event.amount}
                        color="primary"
                        participants={event.usersAttended}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
