// Libraries
const fs = require('fs')
// Data
let toys = require('../data/toysDB.json')
// Global Variables
const PAGE_SIZE = 10

module.exports = {
  query,
  get,
  remove,
  save,
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

//? Save - Save/Edit
function save(toy) {
  if (toy._id) {
    const idx = toys.findIndex((currToy) => currToy._id === toy._id)
    if (!idx) return Promise.reject('No such Toy!')
    toys[idx] = { ...toys[idx], ...toy }
  } else {
    // In case we want to make a random toy
    if (toy.name === undefined)
      toy.name = 'Random ' + _getRandomIntInclusive(4000, 8000)
    if (toy.price === undefined) toy.price = _getRandomIntInclusive(1, 500)
    if (toy.inStock === undefined)
      toy.inStock = _getRandomIntInclusive(1, 4) >= 2 ? true : false

    toy.createdAt = Date.now()
    toy._id = _makeId()

    toys.unshift(toy)
  }
  return _writeToysToFile().then(() => toy)
}

//? Get - Read
function get(toyId) {
  const toy = toys.find((toy) => toy._id === toyId)
  if (!toy) return Promise.reject('Toy not found')
  return Promise.resolve(toy)
}

//? Remove - Delete
function remove(toyId) {
  const idx = toys.findIndex((toy) => toy._id === toyId)
  if (idx === -1) return Promise.reject('No Such Toy!')
  toys.splice(idx, 1)
  _writeToysToFile()
  return Promise.resolve()
}

//? Private Functions
function _writeToysToFile() {
  return new Promise((res, rej) => {
    const data = JSON.stringify(toys, null, 2)
    fs.writeFile('data/toysDB.json', data, (err) => {
      if (err) return rej(err)
      console.log('File written successfully\n')
      res()
    })
  })
}

function _makeId(length = 5) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function _getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}
