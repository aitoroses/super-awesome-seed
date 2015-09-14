var Nocker = require('nocker')
var todosCollection = require('./todos')

function handleError(res, err) {
  if (err) {
    res.status(500)
    res.end(err)
    return false
  } else {
    return true
  }
}

Nocker.register([
  {
    method: 'GET',
    path: '/todos',
    reply: function(params, query, body) {
      var res = this.res
      todosCollection.find({}, function(err, result) {
        if (err) {
          res.status(500)
          res.end(err)
        } else {
          res.json(result)
        }
      })
    }
  },
  {
    method: 'POST',
    path: '/todos',
    reply: function(params, query, body) {
      var res = this.res
      todosCollection.remove({}, function(err) {
        if (handleError(res, err)) {
          todosCollection.insert(body, function(err, todos) {
            if (handleError(res, err)) {
              res.json(todos)
            }
          })
        }

      })
    }
  },
])

Nocker.start({delay: 200, port: 9000, auth: false}, function() {
  console.log('Server is listening on port ' + this.port + '\n')
})
