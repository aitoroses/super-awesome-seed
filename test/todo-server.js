var Nocker = require('nocker')
var fs = require('fs')

Nocker.register([
  {
    method: 'GET',
    path: '/todos',
    reply: function(params, query, body) {
      var result = fs.readFileSync('test/todos.json')
      return JSON.parse(result.toString())
    }
  },
  {
    method: 'POST',
    path: '/todos',
    reply: function(params, query, body) {
      fs.writeFileSync('test/todos.json', JSON.stringify(body))
      this.res.end()
    }
  },
])

Nocker.start({delay: 200, port: 9000, auth: false}, function() {
  console.log('Server is listening on port ' + this.port + '\n')
})
