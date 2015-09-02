'use strict'

let db = require('../disclaimers')
db.loadDatabase(main)

function main() {

  let data = require('./disclaimers-trace.json')
  let disclaimersData = data
    .reduce(function(acc, x) {return acc.concat(x.reply)}, [])
    .filter(function(x) {return typeof x == 'object'})

  db.insert(disclaimersData)
}
