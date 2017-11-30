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
  var queryParams = req.query;
  var filteredTodos = todos;

  if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
    filteredTodos = _.where(todos, {completed: true});
  } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
      filteredTodos = _.where(todos, {completed: false});
  }

  res.json(filteredTodos);
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

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id, 10);
  var todoMatch = _.findWhere(todos, {id: todoId});
  var body = _.pick(req.body, 'description', 'completed');
  var validAttributes = {};
  if (!todoMatch) {
    return res.status(404).send();
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttributes.completed = body.completed;
  } else if (body.hasOwnProperty('completed')) {
      return res.status(400).send();
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
    validAttributes.description = body.description;
  } else if (body.hasOwnProperty('description')) {
    return res.status(400).send();
  }

  _.extend(todoMatch, validAttributes);
  res.json(todoMatch);
});


app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});