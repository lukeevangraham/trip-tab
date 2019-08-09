import React from "react";
import axios from "axios";
import { Table } from "reactstrap";
import "../../../client/src/events.css";

let participants = [];

function eventCard(props) {
  return (
      <tr className={"text-white table-" + props.color}>
        <td className="align-top">
          <ol>
            {props.participants.map(user => {
              console.log(user);
              return <li> {user} </li>;
            })}
          </ol>
        </td>
        <td className="align-top">{props.eventname}</td>
        <td className="align-top">${props.amount}
        </td>
      </tr>
  );
}

export default eventCard;
