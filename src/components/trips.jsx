import React, { Component } from 'react';
var mongoose = require("mongoose");

// import React, { Component } from 'react'
class Trips extends Component {
  constructor() {
      super()
  }


  render() {
      const imageStyle = {
          width: 400
      }
      return (
          <div>
              <p>Trip Information</p>

              <form>
              First name:
            <input type="text" name="firstname" value="Mickey">
                      Last name: </input>
            <input type="text" name="lastname" value="Mouse"></input>

  <input type="submit" value="Submit"></input>
</form> 
              
              <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" />
          </div>
      )

  }
}

export default Trips

// // Save a reference to the Schema constructor
// var Schema = mongoose.Schema;

// // Create the headlineSchema with our schema class
// var ArticleSchema = new Schema({
//   // headline, a string, must be entered
//   trip: {
//     type: String,
//     required: true,
//     unique: { index: { unique: true } }
//   },
//   // summary, a string, must be entered
//   location: {
//     type: String,
//     required: true
//   },
//   // url, a string, must be entered
//   whoWent: {
//     type: String,
//     required: true
//   },
//   // date is just a string
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   whoPaid: {
//     type: String,
//     required: true
//   },
//   saved: {
//     type: Boolean,
//     default: false
//   }
// });

// // Create the Headline model using the headlineSchema
// var Headline = mongoose.model("Headline", ArticleSchema);

// // Export the Headline model
// module.exports = Headline;


// // Using the Schema constructor, create a new UserSchema object
// // This is similar to a Sequelize model
// var ArticleSchema = new Schema({
//   // `title` is required and of type String
//   title: {
//     type: String,
//     required: true
//   },
//   // `link` is required and of type String
//   link: {
//     type: String,
//     required: true
//   },
//   // `note` is an object that stores a Note id
//   // The ref property links the ObjectId to the Note model
//   // This allows us to populate the Article with an associated Note
//   note: {
//     type: Schema.Types.ObjectId,
//     ref: "Note"
//   }
// });

// // This creates our model from the above schema, using mongoose's model method
// var Article = mongoose.model("Article", ArticleSchema);

// // Export the Article model
// module.exports = Article;
