// Libraries
const express = require('express')
// Middleware
const { log } = require('../../middlewares/logger.middleware')
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
// Controller
const {
  getToys,
  getToyById,
  //   addToy,
  //   updateToy,
  //   removeToy,
  //   addToyMsg,
  //   removeToyMsg,
} = require('./toy.controller')
// Config
const router = express.Router()

router.get('/', log, getToys)
router.get('/:id', getToyById)
// router.post('/', requireAuth, addToy)
// router.put('/:id', requireAuth, updateToy)
// router.delete('/:id', requireAuth, removeToy)

// router.post('/:id/msg', requireAuth, addToyMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeToyMsg)

module.exports = router
