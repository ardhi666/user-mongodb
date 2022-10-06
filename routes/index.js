const express = require('express')
const router = express.Router()

const UserController = require('../controllers/User')


router.post('/user', UserController.register)
router.get('/user/:id', UserController.getUser)
router.get('/user', UserController.getsUser)
router.patch('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

module.exports = router