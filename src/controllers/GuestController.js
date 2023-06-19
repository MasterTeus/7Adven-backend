const GuestModel = require('../models/GuestModel');
const ProjectModel = require('../models/ProjectModel');

module.exports = {
  async store(req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  async getGuestForProject(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ message: 'ID not found' });
      }

      const guestsData = await GuestModel.find({ projectId: id });

      return res.json(guestsData);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  async checkingPresence(req, res) {
    try {
      const { id } = req.params;
      const presence = req.body;

      if (!id) {
        return res.status(404).json({ message: 'ID not found' });
      }

      await GuestModel.updateOne(
        { _id: id, 'presence.date': presence.date },
        { $set: { 'presence.$.checking': !presence.checking } }
      );

      const response = await GuestModel.findById(id);

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  // Update value from array $
  // https://docs.mongodb.com/manual/reference/operator/update/positional/

  async checkingVisited(req, res) {
    try {
      const { id } = req.params;
      const presence = req.body;

      if (!id) {
        return res.status(404).json({ message: 'ID not found' });
      }

      await GuestModel.updateOne(
        { _id: id, 'visited.date': presence.date },
        { $set: { 'visited.$.checking': !presence.checking } }
      );

      const response = await GuestModel.findById(id);

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  async getGuestHash(req, res) {
    try {
      const { hash } = req.params;

      const response = await GuestModel.findOne({ hash: hash }).populate(
        'projectId'
      );

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
