'use strict'

let db = require('../countries')
db.loadDatabase(main)

function main() {

  let data = require('./countries-trace.json')
  let countriesData = data
    .reduce(function(acc, x) {return acc.concat(x.reply)}, [])
    .filter(function(x) {return typeof x == 'object'})

  db.insert(countriesData)
}
