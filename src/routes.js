const { Router } = require("express");
const ProjectController = require("./controllers/ProjectController");

const routes = Router();

routes.post("/users", ProjectController.store);

module.exports = routes;
