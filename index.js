const express = require('express');

const server = express();

server.use(express.json());

// localhost:3000/teste
// Query params = ?teste=1
// Route params = /users/1
// Requet body = { "name":"Pedro"}

// CRUD - Create, Read, Update, Delete

const projects = [];
var id = 0

function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

function checkProjectIdExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

function checkTitleInArray ( req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({error: 'Title is required'})
  }
  return next();
}

server.use(logRequests, (req,res, next) => {
  console.time('Request')
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd('Request');
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});


server.post('/projects', checkTitleInArray, (req, res) => {
  const {title } = req.body;

  id += 1

  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return res.json(project);
  
});

server.put('/projects/:id', checkProjectIdExists, checkTitleInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', checkProjectIdExists, (req,res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  const project = projects.find(p => p.id == id);
  const projectTitle = project.title

  projects.splice(projectIndex, 1);

  return res.send(`Projeto ${projectTitle} deletado com sucesso.`);
});

server.post('/projects/:id/tasks',checkProjectIdExists, checkTitleInArray,  (req, res) => {
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title)

  return res.json(project);
});


server.listen(3000);