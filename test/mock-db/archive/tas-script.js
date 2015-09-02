'use strict'

let db = require('../tas');
db.loadDatabase(main)

function main() {

  let data = require('./tas-trace.json');
  let itemsData = data
    .reduce(function(acc, x) {return acc.concat(x.reply)}, [])
    .filter(function(x) {return typeof x == "object"});

  db.insert(itemsData);
}
