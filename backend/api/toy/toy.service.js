//? Services
const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
//? Data
const ObjectId = require('mongodb').ObjectId
//? Global Variables
// const PAGE_SIZE = 10
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
    //? DONE: FILTERING/SORTING/PAGING
    const sortCriteria = _buildSortCriteria(query)
    const filterCriteria = _buildFilterCriteria(query)
    const collection = await dbService.getCollection(TOYS_DB)
    let toys = await collection
      .find(filterCriteria)
      .sort(sortCriteria)
      .toArray()
    return _setPage(query, toys)
  } catch (err) {
    logger.error('Cannot find toys', err)
    throw err
  }
}

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

//? Private Functions - Query - List/Filtering/Sorting/Paging

function _buildFilterCriteria(filterBy) {
  const { name, maxPrice, inStock, labels } = filterBy
  let criteria = {}
  if (name) criteria.name = { $regex: name ? name : '', $options: 'i' }
  if (maxPrice) criteria.price = { $lt: maxPrice ? +maxPrice : Infinity }
  if (inStock) criteria.inStock = true // TODO: Make it work with false
  if (labels?.length) criteria.labels = { $all: labels.split(',') }
  return criteria
}

function _buildSortCriteria(filterBy) {
  const { sortBy, sortValue } = filterBy
  return { [sortBy ? sortBy : 'createdAt']: sortValue ? 1 : -1 }
}

function _setPage(filterBy, toys) {
  const { pageSize, pageIdx } = filterBy
  if (!pageSize) return toys
  let startIdx = null
  if (pageIdx !== undefined) startIdx = pageIdx * +pageSize
  return toys.slice(startIdx, +pageSize + startIdx)
}
