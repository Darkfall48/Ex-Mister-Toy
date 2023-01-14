// Libraries
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
// Services
const logger = require('./services/logger.service')
// Routes
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const toyRoutes = require('./api/toy/toy.routes')
// Server Config
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const SERVER_PORT = process.env.PORT || 3030

//* Express App Config
app.use(express.json())
app.use(cookieParser())
// app.use(express.static('public'))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

//* Real routing express
//? If index.html is not found, create a simple html page.
// app.get('/', (req, res) => res.send('You are not supposed to see me:('))

//* routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)

//* Cloud Config
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//* Start the server on port: SERVER_PORT (3030)
http.listen(SERVER_PORT, () => {
  logger.info('Server is running on port:', SERVER_PORT)
})
