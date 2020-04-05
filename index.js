const express = require('express');

const server = express();

server.use(express.json());

// localhost:3000/teste
// Query params = ?teste=1
// Route params = /users/1
// Requet body = { "name":"Pedro"}

// CRUD - Create, Read, Update, Delete

const users = ['Diego', 'Robson', 'Victor'];

server.use((req,res, next) => {
  console.time('Request')
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd('Request');
})

server.get('/users', (req, res) => {
  //console.log(`Lista de usuários:`, users);
  return res.json(users);
})


server.listen(3000);