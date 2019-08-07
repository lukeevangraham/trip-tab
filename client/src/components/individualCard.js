import React, { Component } from "react";

const styles = {
  cardStyle: {
    borderRadius: 0
  }
};

function Individualcard(props) {
  return (
    <div
      className={
        "card-block rounded-0 border-top-0 border-right-0 border-left-0 p-1 text-white bg-" +
        props.color
      }
    >
      <div className="row no-gutters">
        <div className="col-1">
          <i class="pr-2 fas fa-user" />
        </div>
        <div className="pr-3 col-4">{props.username}</div>
        <div className="col-7">${props.amount}</div>
      </div>
    </div>
  );
}

export default Individualcard;
