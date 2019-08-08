import React, { Component } from "react";

const styles = {
    cardStyle: {
        borderRadius: 0
    }
};

function OwedToYou(props) {
    console.log(props)
    return (
            <tr className={"text-white table-" + props.color}>
                {/* <th scope="row"><i class="pl-2 fas fa-user" /></th> */}
                <td className="align-middle">{props.username}</td>
                <td className="align-middle">{props.eventName}</td>
                <td className="align-middle">${props.amount.toFixed(2)}</td>
                
                {props.payee ? (
                <td><button className="btn btn-dark text-light btn-sm" onClick={() => props.onClick(props.eventId, props.payee, props.eventName, props.username, props.amount)}>Pay</button></td>
                ) : (
                    ""
                )}
            </tr>
    );
}

export default OwedToYou;
