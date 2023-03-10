// Libraries
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
// Services
const toyService = require('./services/toy.service.js')
// Server Config
const path = require('path')
const app = express()
const SERVER_PORT = process.env.PORT || 3030

//* Express App Config
app.use(express.json())
app.use(cookieParser())
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

//* Real routing express
//? If index.html is not found, create a simple html page.
app.get('/', (req, res) => res.send('You are not supposed to see me:('))

//? Query - List/Filtering/Sorting/Paging
// app.get('/api', (req, res) => res.redirect('/api/toy'))
app.get('/api/toy', (req, res) => {
  const { query } = req
  console.log('Result', query)
  toyService
    .query(query)
    .then((toys) => {
      res.send(toys)
    })
    .catch((err) => {
      console.log('Had issues getting toy:', err)
      res.status(404).send({ msg: 'Had issues getting toy' })
    })
})

//? Create - Save
app.post('/api/toy', (req, res) => {
  const toy = req.body
  toyService
    .save(toy)
    .then((savedToy) => {
      res.send(savedToy)
    })
    .catch((err) => {
      console.log('Had issues adding toy:', err)
      res.status(404).send({ msg: 'Had issues adding toy' })
    })
})

//? Update - Edit
app.put('/api/toy', (req, res) => {
  const toy = req.body
  toyService
    .save(toy)
    .then((savedToy) => {
      res.send(savedToy)
    })
    .catch((err) => {
      console.log('Had issues updating toy:', err)
      res.status(404).send({ msg: 'Had issues updating toy' })
    })
})

//? Get - Read
app.get('/api/toy/:toyId', (req, res) => {
  const { toyId } = req.params
  toyService
    .get(toyId)
    .then((toy) => {
      res.send(toy)
    })
    .catch((err) => {
      console.log('Had issues getting toy:', err)
      res.status(404).send({ msg: 'Had issues getting toy' })
    })
})

//? Remove - Delete
app.delete('/api/toy/:toyId', (req, res) => {
  const { toyId } = req.params
  toyService
    .remove(toyId)
    .then(() => {
      res.end('Done!')
    })
    .catch((err) => {
      console.log('Had issues deleting toy:', err)
      res.status(404).send({ msg: 'Had issues deleting toy' })
    })
})

//* Cloud Config
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//* Start the server on port: SERVER_PORT (3030)
app.listen(SERVER_PORT, () => {
  console.log('Server is up and listening to', SERVER_PORT)
})
