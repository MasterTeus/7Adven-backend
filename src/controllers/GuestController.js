const GuestModel = require("../models/GuestModel");
const ProjectModel = require("../models/ProjectModel");

module.exports = {
  async store(req, res) {
    const {
      name,
      phoneNumber,
      document,
      brithDay,
      location,
      father,
      mother,
      projectId
    } = req.body;

    const projectOld = await ProjectModel.findById(projectId);
    const guestOld = await GuestModel.find();

    const response = await GuestModel.create({
      name,
      phoneNumber,
      document,
      brithDay,
      location,
      presence: projectOld.dates.map((date) =>
        Object({ date: date, checking: false })
      ),
      visited: projectOld.dates.map((date) =>
        Object({ date: date, checking: false })
      ),
      father,
      mother,
      hash: Math.random().toString(36).substr(2, 9),
      projectId
    });

    await ProjectModel.findByIdAndUpdate(
      { _id: projectId },
      { guest: [...projectOld.guest, response._id] },
      { new: true }
    );

    return res.json(response);
  },

  async getGuestForProject(req, res) {
    const { id } = req.params;

    const guestsData = await GuestModel.find({ projectId: id });

    return res.json(guestsData);
  },

  async checkingPresence(req, res) {
    const { id } = req.params;
    const presence = req.body;

    await GuestModel.updateOne(
      { _id: id, "presence.date": presence.date },
      { $set: { "presence.$.checking": !presence.checking } }
    );

    const response = await GuestModel.findById(id);

    return res.json(response);
  },

  // Update value from array $
  // https://docs.mongodb.com/manual/reference/operator/update/positional/

  async checkingVisited(req, res) {
    const { id } = req.params;
    const presence = req.body;

    await GuestModel.updateOne(
      { _id: id, "visited.date": presence.date },
      { $set: { "visited.$.checking": !presence.checking } }
    );

    const response = await GuestModel.findById(id);

    return res.json(response);
  }
};
