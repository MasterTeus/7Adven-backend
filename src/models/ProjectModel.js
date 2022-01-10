const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  sharedCode: String,
  name: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  dates: [String],
  contributors: [],
  guest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guest" }]
});

module.exports = mongoose.model("Project", ProjectSchema);
