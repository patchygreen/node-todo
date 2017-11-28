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
  var id = req.params.id;
  var todoMatched;
  todos.forEach(function (todoObj) {
    if (todoObj.id && todoObj.id == id) {
      todoMatched = todoObj;
    }
  });
  if (todoMatched !== 'undefined') {
    res.json(todoMatched);
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});