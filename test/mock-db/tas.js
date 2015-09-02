'use strict'

let path = require('path')
const DATABASE = 'test/mock-db/tas.db'

let Datastore = require('nedb')
let db = new Datastore({ filename: path.resolve(DATABASE) })

db.loadDatabase()

module.exports = db
