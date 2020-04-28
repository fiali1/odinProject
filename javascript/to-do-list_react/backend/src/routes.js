const express = require('express');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const profileController = require('./controllers/profileController');
const todoController = require('./controllers/todoController');

const routes = express.Router();

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.put('/users/:id', userController.edit);
routes.delete('/users/:id', userController.delete);

routes.post('/session', sessionController.create);

routes.get('/profile', profileController.index);

routes.get('/todos', todoController.index);
routes.post('/todos', todoController.create);
routes.get('/todos/:id', todoController.details);
routes.put('/todos/edit/:id', todoController.edit);
routes.put('/todos/status/:id', todoController.status);
routes.delete('/todos/:id', todoController.delete);

module.exports = routes;

