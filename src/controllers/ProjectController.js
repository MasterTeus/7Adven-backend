const ProjectModel = require("../models/ProjectModel");
const UserModel = require("../models/UserModel");

module.exports = {
  async store(req, res) {
    const { name, location, dates, ownerName } = req.body;

    const responseNewProject = await ProjectModel.create({
      name,
      location,
      dates,
      contributors: [{ name: ownerName }]
    });

    // const isUserExists = await UserModel.findOne({ deviceId });

    // if (isUserExists) {
    //   console.log("Usuario ja existe");
    //   await UserModel.findByIdAndUpdate(
    //     isUserExists._id,
    //     { projects: [...isUserExists.projects, responseNewProject] },
    //     { new: true }
    //   );
    // } else {
    //   console.log("Novo User");
    //   await UserModel.create({
    //     name: ownerName,
    //     deviceId,
    //     projects: [responseNewProject]
    //   });
    // }

    return res.json(responseNewProject);
  },

  async index(req, res) {
    const { id } = req.params;

    const response = await ProjectModel.findById(id);

    return res.json(response);
  }
};
