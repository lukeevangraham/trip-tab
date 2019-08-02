import React from "react";
import "./totalBalance.css"

function TripFormCard(props) {
    return (
        <div className="card text-white border-warning bg-warning  mb-3 rounded card-parent">
            {/* <div className="card-header text-left">Upcoming Trips</div> */}
            <div className="card-body text-left">
                <h4 className="card-title mb-1">Trip Information</h4>
                <p className="card-text mt-3 pl-3 align-top ">{props.tripName}:
                <input />
                    <br /><br />
                    Date:<input
                        type="date"/>
                        {/* // value={this.props.searchString}
                        // ref="searchStringInput"
                        // onChange={this.handleChange}  */}
                     
                    <br /><br />
                    Location:
                    <input
                        type="text"
                    // value={this.props.searchString}
                    // ref="searchStringInput"
                    // onChange={this.handleChange}
                    />
                    <select>
                        <option value=""></option>
                        <option value="1">AL</option>
                        <option value="2">AK</option>
                        <option value="3">AZ</option>
                        <option value="4">AK</option>
                        <option value="5">CA</option>
                        <option value="6">CO</option>
                        <option value="7">CT</option>
                        <option value="8">DE</option>
                        <option value="9">FL</option>
                        <option value="10">GA</option>
                        <option value="11">HI</option>
                        <option value="12">ID</option>
                        <option value="13">IL</option>
                        <option value="14">IN</option>
                        <option value="15">IA</option>
                        <option value="16">KA</option>
                        <option value="17">KY</option>
                        <option value="18">LA</option>
                        <option value="19">ME</option>
                        <option value="20">MD</option>
                        <option value="21">MA</option>
                        <option value="22">MI</option>
                        <option value="23">MN</option>
                        <option value="24">MS</option>
                        <option value="25">MO</option>
                        <option value="26">MT</option>
                        <option value="27">NE</option>
                        <option value="28">NV</option>
                        <option value="29">NH</option>
                        <option value="30">NJ</option>
                        <option value="31">NM</option>
                        <option value="32">NY</option>
                        <option value="33">NC</option>
                        <option value="34">ND</option>
                        <option value="35">OH</option>
                        <option value="36">OK</option>
                        <option value="37">OR</option>
                        <option value="38">PA</option>
                        <option value="39">RI</option>
                        <option value="40">SC</option>
                        <option value="41">SD</option>
                        <option value="42">TN</option>
                        <option value="43">TX</option>
                        <option value="44">UT</option>
                        <option value="45">VT</option>
                        <option value="46">VA</option>
                        <option value="47">WA</option>
                        <option value="48">WV</option>
                        <option value="49">WI</option>
                        <option value="50">WY</option>
                    </select>
                    <br /><br />
                </p>

            </div>
        </div>
    );
}

export default TripFormCard