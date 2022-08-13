const Router = require('express')
const router = new Router()
const cartController = require('../controllers/CartController')

router.post('/create',cartController.create)
router.post('/add',cartController.add)
router.get('/get',cartController.get)

module.exports = router
