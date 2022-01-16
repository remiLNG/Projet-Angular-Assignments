let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema, "users");
