const express = require('express');
const helmet = require('helmet');

// Require router
const projectRouter = require('../router/projectRouter');
const taskRouter = require('../router/taskRouter');
const resourceRouter = require('../router/resourceRouter');
const projectDetailsRouter = require('../router/projectDetailsRouter');

const server = express();
server.use(helmet());
server.use(express.json());

// Global test endpoint
server.get('/', (req, res) => {
res.send(`<h3>Create Projects to accomplish GREATNESS!</h3>`)
});

// Call carRouter
server.use('/api/projects', projectRouter);
server.use('/api/tasks', taskRouter);
server.use('/api/resources', resourceRouter);
// server.use('/api/proj_details', projectDetailsRouter);

module.exports = server;    