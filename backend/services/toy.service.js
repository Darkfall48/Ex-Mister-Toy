const fs = require('fs')

var toys = require('../data/toysDB.json')

module.exports = {
  query,
  //   get,
  //   remove,
  //   save,
}

function query(querry) {
  if (!querry) return Promise.resolve(toys)

  //* Filtering
  let filteredToys = toys
  const { name, maxPrice, inStock, labels } = querry
  if (name) {
    const regex = new RegExp(name, 'i')
    filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
  }
  if (maxPrice) {
    filteredToys = filteredToys.filter((toy) => toy.price <= maxPrice)
  }
  if (inStock) {
    filteredToys = filteredToys.filter(
      (toy) => toy.inStock + '' === inStock + ''
    )
  }
  if (labels) {
    const labels = labels.split(',')
    filteredToys = filteredToys.filter((toy) =>
      labels.every((i) => toy.labels.includes(i))
    )
  }

  // Sorting
  filteredToys.sort((toy1, toy2) => {
    const { sortBy, sortValue } = querry
    console.log('Sort by:', sortBy, 'with', sortValue)
    const dir = sortValue ? 1 : -1
    if (sortBy === 'name') return toy1.name.localeCompare(toy2.name) * dir
    if (sortBy === 'price') return (toy1.price - toy2.price) * dir
    if (sortBy === 'createdAt') return (toy1.createdAt - toy2.createdAt) * dir
  })

  return Promise.resolve(filteredToys)
}
