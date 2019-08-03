import React, { Component } from "react";

const styles = {
    cardStyle: {
        borderRadius: 0
    }
};

function Individualcard(props) {
    return (

            <tr className={"text-white table-" + props.color}>
                <th scope="row"><i class="p-2 fas fa-user" /></th>
                <td className="align-middle">{props.username}</td>
                <td className="align-middle">${props.amount}</td>
            </tr>




    );
}

export default Individualcard;
