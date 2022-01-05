const { Router } = require("express");
const ProjectController = require("./controllers/UserController");

const routes = Router();

routes.post("/users", ProjectController.store);

module.exports = routes;
