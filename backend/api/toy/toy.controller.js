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
    const { query } = req
    logger.debug('Getting Toys..')
    const toys = await toyService.query(query)
    logger.debug('Toys got successfully!')
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
    logger.debug('Adding Toy..')
    const addedToy = await toyService.add(toy)
    logger.debug('Toy added successfully!')
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
    const { _id: toyId } = toy
    logger.debug('Updating Toy..', toyId)
    const updatedToy = await toyService.update(toy)
    logger.debug('Toy updated successfully!', toyId)
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
    logger.debug('Getting Toy..', toyId)
    const toy = await toyService.getById(toyId)
    logger.debug('Toy got successfully!', toyId)
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
    logger.debug('Removing Toy..', toyId)
    const removedId = await toyService.remove(toyId)
    logger.debug('Toy removed successfully!', toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}
