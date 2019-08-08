import React from "react";
import axios from "axios";
import { Table } from 'reactstrap';
import "../../../client/src/events.css"

let participants = []

function eventCard(props) {
    return (
        <div className="container">
            <Table className={"table table-hover" + props.color}>
                <tbody>
                    <tr className={"text-white table-"}>
                        <th scope="row">
                            <ol>
                                {props.participants.map(user => {
                                    console.log(user);
                                    return (<li> {user} </li>)
                                })}
                            </ol>
                        </th>
                        {/* <td className="text-center">
                            <p className="lead">{props.username}</p>
                        </td> */}
                        <td>
                        <p className="lead">{props.eventname}</p>
                        </td>
                        <td>
                        <p className="lead">${props.amount}</p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default eventCard;