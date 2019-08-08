import React, { Component } from "react";

const styles = {
    cardStyle: {
        borderRadius: 0
    }
};

function Individualcard(props) {
    console.log(props)
    return (
            <tr className={"text-white table-" + props.color}>
                <th scope="row"><i class="pl-2 fas fa-user" /></th>
                <td className="align-middle">{props.payee}</td>
                <td className="align-middle">{props.eventName}</td>
                <td className="align-middle">${props.amount.toFixed(2)}</td>
                <td><button onClick={() => props.onClick(props.eventId, props.payee, props.eventName, props.username, props.amount)}>Pay</button></td>
            </tr>
    );
}

export default Individualcard;
