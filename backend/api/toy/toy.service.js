//? Services
const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')
//? Data
const ObjectId = require('mongodb').ObjectId
//? Global Variables
const PAGE_SIZE = 10
const TOYS_DB = 'toys_col'

module.exports = {
  query,
  getById,
  add,
  update,
  remove,
  // addToyMsg,
  // removeToyMsg,
}

//? Query - List/Filtering/Sorting/Paging
async function query(query) {
  try {
    //! Criteria not working
    // TODO: FILTERING/SORTING/PAGING
    const { name, maxPrice, inStock, labels } = query
    console.log('Name:', name)
    const criteria = {
      name: { $regex: name, $option: 'i' },
    }
    const collection = await dbService.getCollection(TOYS_DB)
    let toys = await collection.find().toArray()
    return toys
  } catch (err) {
    logger.error('Cannot find toys', err)
    throw err
  }
}

// function query(querry) {
//   if (!querry) return Promise.resolve(toys)

//   //* Filtering
//   let filteredToys = toys
//   const { name, maxPrice, inStock, labels } = querry
//   if (name) {
//     const regex = new RegExp(name, 'i')
//     filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
//   }
//   if (maxPrice) {
//     filteredToys = filteredToys.filter((toy) => toy.price <= maxPrice)
//   }
//   if (inStock) {
//     filteredToys = filteredToys.filter(
//       (toy) => toy.inStock + '' === inStock + ''
//     )
//   }
//   if (labels) {
//     const labelsArr = labels.split(',')
//     filteredToys = filteredToys.filter((toy) =>
//       labelsArr.every((i) => toy.labels.includes(i))
//     )
//   }

//   //* Sorting
//   filteredToys.sort((toy1, toy2) => {
//     const { sortBy, sortValue } = querry
//     // console.log('Sort by:', sortBy, 'with', sortValue)
//     const dir = sortValue ? 1 : -1
//     if (sortBy === 'name') return toy1.name.localeCompare(toy2.name) * dir
//     if (sortBy === 'price') return (toy1.price - toy2.price) * dir
//     if (sortBy === 'createdAt') return (toy1.createdAt - toy2.createdAt) * dir
//   })

//   //* Paging
//   let { pageSize, pageIdx } = querry
//   if (!pageSize) pageSize = PAGE_SIZE
//   const currPage = +pageIdx
//   const toysLength = filteredToys.length
//   const totalPages = Math.ceil(toysLength / +pageSize)
//   if (pageIdx !== undefined) {
//     const startIdx = pageIdx * +pageSize
//     filteredToys = filteredToys.slice(startIdx, +pageSize + startIdx)
//   }

//   return Promise.resolve({
//     totalToysNumber: toysLength,
//     totalPages,
//     currPage,
//     currToysNumber: filteredToys.length,
//     toys: filteredToys,
//   })
// }

//? Create - Save
async function add(toy) {
  try {
    const collection = await dbService.getCollection(TOYS_DB)
    await collection.insertOne(toy)
    return toy
  } catch (err) {
    logger.error('Cannot insert toy', err)
    throw err
  }
}

//? Update - Edit
async function update(toy) {
  try {
    const { name, price, labels, createdAt, modifiedAt, inStock } = toy
    const toyToSave = {
      name,
      price,
      labels,
      createdAt,
      modifiedAt,
      inStock,
    }
    const collection = await dbService.getCollection(TOYS_DB)
    await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
    return toy
  } catch (err) {
    logger.error(`Cannot update toy ${toyId}`, err)
    throw err
  }
}

//? Get - Read
async function getById(toyId) {
  try {
    const collection = await dbService.getCollection(TOYS_DB)
    const toy = collection.findOne({ _id: ObjectId(toyId) })
    // TODO: Return error if toyId is not found
    return toy
  } catch (err) {
    logger.error(`While finding toy ${toyId}:`, err)
    throw err
  }
}

//? Remove - Delete
async function remove(toyId) {
  try {
    const collection = await dbService.getCollection(TOYS_DB)
    await collection.deleteOne({ _id: ObjectId(toyId) })
    // TODO: Return error if toyId is not found
    return toyId
  } catch (err) {
    logger.error(`Cannot remove toy ${toyId}`, err)
    throw err
  }
}
