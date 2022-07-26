const Router = require('express')
const router = new Router()
const productController = require('../controllers/ProductController.js')

router.post('/create',productController.create)
router.get('/getAll',productController.getAll)
router.get('/get',productController.get)


module.exports = router
