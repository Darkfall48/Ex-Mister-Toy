const fs = require('fs')

var toys = require('../data/toysDB.json')

module.exports = {
  query,
  //   get,
  //   remove,
  //   save,
}

function query(filterBy, sort) {
  if (!filterBy) return Promise.resolve(toys)
}
