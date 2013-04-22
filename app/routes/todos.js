var Todo;

Todo = require('../models/todo');

exports.list = function(req, res) {
  return res.json([
    {
      title: 'First todo'
    }
  ]);
};

exports.post = function(req, res) {
  var todo;
  todo = new Todo({
    title: 'hello'
  });
  return todo.save(function(err) {
    if (err != null) {
      next(err);
    }
    return res.json(todo);
  });
};

exports.put = function(req, res) {
  return res.send(404, 'Implement');
};
