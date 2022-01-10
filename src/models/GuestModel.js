const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: String,
  document: String,
  brithDay: String,
  phoneNumber: String,
  presence: [],
  visited: [],
  location: {
    latitude: Number,
    longitude: Number
  },
  father: String,
  mother: String,
  hash: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});

module.exports = mongoose.model("Guest", GuestSchema);
