var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id: 1,
  description: 'Meet Mom for lunch',
  completed: false
},{
  id: 2,
  description: 'Go to market.',
  completed: false
}, {
  id: 3,
  description: 'Go the Gym.',
  completed: true
}];

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

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});