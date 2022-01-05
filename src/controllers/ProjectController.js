const ProjectModel = require("../models/ProjectModel");

module.exports = {
  async store(req, res) {
    const { sharedCode, name, location, dates, contributors } = req.body;

    const response = await ProjectModel.create({
      sharedCode,
      name,
      location,
      dates,
      contributors
    });

    return res.json(response);
  }
};
