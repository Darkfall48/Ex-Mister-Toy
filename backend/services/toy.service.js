const fs = require('fs')

let toys = require('../data/toysDB.json')
const PAGE_SIZE = 10

module.exports = {
  query,
  get,
  //   remove,
  //   save,
}

//? Query - List/Filtering/Sorting/Paging
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
    const labelsArr = labels.split(',')
    filteredToys = filteredToys.filter((toy) =>
      labelsArr.every((i) => toy.labels.includes(i))
    )
  }

  //* Sorting
  filteredToys.sort((toy1, toy2) => {
    const { sortBy, sortValue } = querry
    console.log('Sort by:', sortBy, 'with', sortValue)
    const dir = sortValue ? 1 : -1
    if (sortBy === 'name') return toy1.name.localeCompare(toy2.name) * dir
    if (sortBy === 'price') return (toy1.price - toy2.price) * dir
    if (sortBy === 'createdAt') return (toy1.createdAt - toy2.createdAt) * dir
  })

  //* Paging
  let { pageSize, pageIdx } = querry
  if (!pageSize) pageSize = PAGE_SIZE
  const currPage = +pageIdx
  const toysLength = filteredToys.length
  const totalPages = Math.ceil(toysLength / +pageSize)
  if (pageIdx !== undefined) {
    const startIdx = pageIdx * +pageSize
    filteredToys = filteredToys.slice(startIdx, +pageSize + startIdx)
  }

  return Promise.resolve({
    totalToysNumber: toysLength,
    totalPages,
    currPage,
    currToysNumber: filteredToys.length,
    toys: filteredToys,
  })
}

//? Get - Read
function get(toyId) {
  const toy = toys.find((toy) => toy._id === toyId)
  if (!toy) return Promise.reject('Toy not found')
  return Promise.resolve(toy)
}
