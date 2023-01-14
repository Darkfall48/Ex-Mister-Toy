// Services
const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

module.exports = {
  getToys,
  //   getToyById,
  //   addToy,
  //   updateToy,
  //   removeToy,
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
    logger.error('Had issues getting toys:', err)
    res.status(500).send({ err: 'Had issues getting toys' })
  }
}

//? Create - Save
// app.post('/api/toy', (req, res) => {
//   const toy = req.body
//   toyService
//     .save(toy)
//     .then((savedToy) => {
//       res.send(savedToy)
//     })
//     .catch((err) => {
//       console.log('Had issues adding toy:', err)
//       res.status(404).send({ msg: 'Had issues adding toy' })
//     })
// })

//? Update - Edit
// app.put('/api/toy', (req, res) => {
//   const toy = req.body
//   toyService
//     .save(toy)
//     .then((savedToy) => {
//       res.send(savedToy)
//     })
//     .catch((err) => {
//       console.log('Had issues updating toy:', err)
//       res.status(404).send({ msg: 'Had issues updating toy' })
//     })
// })

//? Get - Read
// app.get('/api/toy/:toyId', (req, res) => {
//   const { toyId } = req.params
//   toyService
//     .get(toyId)
//     .then((toy) => {
//       res.send(toy)
//     })
//     .catch((err) => {
//       console.log('Had issues getting toy:', err)
//       res.status(404).send({ msg: 'Had issues getting toy' })
//     })
// })

//? Remove - Delete
// app.delete('/api/toy/:toyId', (req, res) => {
//   const { toyId } = req.params
//   toyService
//     .remove(toyId)
//     .then(() => {
//       res.end('Done!')
//     })
//     .catch((err) => {
//       console.log('Had issues deleting toy:', err)
//       res.status(404).send({ msg: 'Had issues deleting toy' })
//     })
// })
