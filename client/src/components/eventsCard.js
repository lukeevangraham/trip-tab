import React from "react";
import axios from "axios";
import { Table } from "reactstrap";
import "../../../client/src/events.css";

const styles = {
    ol: {
        marginLeft: "0px",
        listStyleType: "none",
        listStylePosition: "inside",
        margin: 0,
        padding: 0
    },
    li: {
        marginLeft: "0px",
        listStyleType: "none",
        listStylePosition: "inside",
        margin: 0,
        padding: 0
    }
}

let participants = [];

function eventCard(props) {
  return (
    <tr className={"text-white table-" + props.color}>
      <td className="align-top">
        <ol style={styles.li}>
          {props.participants.map(user => {
            console.log(user);
            return <li style={styles.ol}> {user} </li>;
          })}
        </ol>
      </td>
      <td className="align-top">{props.eventname}</td>
      <td className="align-top">${props.amount}</td>
    </tr>
  );
}

export default eventCard;
