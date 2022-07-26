const Router = require('express')
const router = Router()

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')

router.use('/user',userRouter)
router.use('/product',productRouter)
router.use('/cart',cartRouter)

module.exports = router
