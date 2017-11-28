var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('ToDo API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
  res.json(todos);
});

// GET /todo/:id
app.get('/todos/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var todoMatch;
  todos.forEach(function (todo) {
    if (todo.id && todo.id === id) {
      todoMatch = todo;
    }
  });
  return todoMatch ? res.json(todoMatch) : res.status(404).send();
});

// POST /todos
app.post('/todos', function (req, res) {
  var body = req.body;
  body.id = todoNextId++;
  todos.push(body);
  res.json(body);
});

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});