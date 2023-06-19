const ProjectModel = require('../models/ProjectModel');
const UserModel = require('../models/UserModel');

module.exports = {
  async store(req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  async index(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ message: 'ID not found' });
      }

      const response = await ProjectModel.findById(id);

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  async storeContributors(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!id) {
        return res.status(404).json({ message: 'ID not found' });
      }

      const response = await ProjectModel.findByIdAndUpdate(
        id,
        {
          $push: { contributors: { name: name } }
        },
        { new: true }
      );

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
