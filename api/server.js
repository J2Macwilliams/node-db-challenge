const express = require('express');
const helmet = require('helmet');

// Require router
const projectRouter = require('../projects/projectRouter');

const server = express();
server.use(helmet());
server.use(express.json());

// Global test endpoint
server.get('/', (req, res) => {
res.send(`<h3>Create Projects to accomplish GREATNESS!</h3>`)
});

// Call carRouter
server.use('/api/projects', projectRouter);

module.exports = server;    