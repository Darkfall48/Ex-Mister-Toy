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

  //* Filtering
  let filteredToys = toys
  if (filterBy.name) {
    const regex = new RegExp(filterBy.name, 'i')
    filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
  }
  if (filterBy.maxPrice) {
    filteredToys = filteredToys.filter((toy) => toy.price <= filterBy.maxPrice)
  }
  if (filterBy.inStock) {
    filteredToys = filteredToys.filter(
      (toy) => toy.inStock + '' === filterBy.inStock + ''
    )
  }
  if (filterBy.labels) {
    const labels = filterBy.labels.split(',')
    filteredToys = filteredToys.filter((toy) =>
      labels.every((i) => toy.labels.includes(i))
    )
  }

  return Promise.resolve(filteredToys)
}
