const Router = require('express')
const router = new Router()
const cartController = require('../controllers/CartController')

router.get('/get',cartController.get)

module.exports = router
