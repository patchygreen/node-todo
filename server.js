var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
  var todoId = parseInt(req.params.id, 10);
  var todoMatch = _.findWhere(todos, {id: todoId});
  return todoMatch ? res.json(todoMatch) : res.status(404).send();
});

// POST /todos
app.post('/todos', function (req, res) {
  var body = req.body;
  var todo = _.pick(body, 'description', 'completed');
  if (!_.isBoolean(todo.completed) || !_.isString(todo.description) || todo.description.trim().length === 0) {
    return res.status(400).send();
  }

  todo.id = todoNextId++;
  todo.description = todo.description.trim();
  todos.push(todo);
  res.json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id, 10);
  var todoMatch = _.findWhere(todos, {id: todoId});
  if (!todoMatch) {
    res.status(404).json({"error": "no todo found with that id"});
  }
  todos = _.without(todos, todoMatch);
  res.json(todos);
});

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});