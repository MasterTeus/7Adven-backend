// const UserModel = require("../models/UserModel");

// module.exports = {
//   async store(req, res) {
//     const { deviceId, name } = req.body;

//     const response = await UserModel.create({
//       deviceId,
//       name
//     });

//     return res.json(response);
//   },

//   async indexDeviceId(req, res) {
//     const { deviceId } = req.query;

//     const response = await UserModel.findOne({ deviceId });

//     if (!response) {
//       return res.status(404).json({ message: "Is Device not exist" });
//     }

//     return res.json(response);
//   }
// };
