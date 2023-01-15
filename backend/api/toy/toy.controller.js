//? Services
const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  //   addToyMsg,
  //   removeToyMsg,
}

//? Query - List/Filtering/Sorting/Paging
async function getToys(req, res) {
  try {
    logger.debug('Getting Toys')
    const { query } = req
    const toys = await toyService.query(query)
    res.json(toys)
  } catch (err) {
    logger.error('Had issues while getting toys', err)
    res.status(500).send({ err: 'Had issues while getting toys' })
  }
}

//? Create - Save
async function addToy(req, res) {
  //   const { loggedinUser } = req
  try {
    const toy = req.body
    // toy.owner = loggedinUser
    logger.debug('Adding Toy')
    const addedToy = await toyService.add(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Had issues while adding car', err)
    res.status(500).send({ err: 'Had issues while adding car' })
  }
}

//? Update - Edit
async function updateToy(req, res) {
  try {
    const toy = req.body
    logger.debug('Updating Toy', toy.id)
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Had issues while updating car', err)
    res.status(500).send({ err: 'Had issues while updating car' })
  }
}

//? Get - Read
async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    logger.debug('Getting Toy', toyId)
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Had issues while getting toy', err)
    res.status(500).send({ err: 'Had issues while getting toy' })
  }
}

//? Remove - Delete
async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    logger.debug('Removing Toy', toyId)
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}
