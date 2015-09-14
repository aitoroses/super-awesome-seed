
var path = require('path')
var NEDB = require('nedb')

// Database Path
const DATABASE_NAME = 'test/mock-db/todos.db'

// Create an instance
var db = new NEDB({ filename: path.resolve(DATABASE), autoload: true })

module.exports = db
