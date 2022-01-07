const { Router } = require("express");
const ProjectController = require("./controllers/ProjectController");
// const UserController = require("./controllers/UserController");

const routes = Router();

// routes.post("/user", UserController.store);
// routes.get("/user", UserController.indexDeviceId);


routes.post("/project", ProjectController.store);

module.exports = routes;
