const { Router } = require('express');
const ProjectController = require('./controllers/ProjectController');
const GuestController = require('./controllers/GuestController');
// const UserController = require("./controllers/UserController");

const routes = Router();

routes.get('/', (_, res) => {
  return res.json({ message: 'Ola Mundo' });
});

// routes.post("/user", UserController.store);
// routes.get("/user", UserController.indexDeviceId);

routes.post('/project', ProjectController.store);
routes.get('/project/:id', ProjectController.index);
routes.post('/add-contributors/:id', ProjectController.storeContributors);

routes.post('/guest', GuestController.store);
routes.get('/guests-to-project/:id', GuestController.getGuestForProject);
routes.post('/checking-presence/:id/', GuestController.checkingPresence);
routes.post('/checking-visited/:id/', GuestController.checkingVisited);
routes.get('/get-guest/:hash/', GuestController.getGuestHash);

module.exports = routes;
