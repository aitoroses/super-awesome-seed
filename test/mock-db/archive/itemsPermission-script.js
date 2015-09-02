'use strict'

let db = require('../itemsPermission')
db.loadDatabase(main)

function main() {

  let data = require('./itemsPermission-trace.json')
  let itemsPermissionData = data
    .reduce(function(acc, x) {return acc.concat(x.reply)}, [])
    .filter(function(x) {return typeof x == 'object'})

  db.insert(itemsPermissionData)
}
