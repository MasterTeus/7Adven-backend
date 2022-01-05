const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  sharedCode: String,
  name: String,
  location: {
    latitude: String,
    longitude: String
  },
  dates: [String],
  contributors: [
    {
      name: String,
      deviceId: String
    }
  ],
  // guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" }
});

module.exports = mongoose.model("Project", ProjectSchema);
