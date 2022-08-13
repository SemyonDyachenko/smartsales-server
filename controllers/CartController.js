const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const { Cart, CartProduct, User, Product} = require('../models/models')

class CartController {

  async create(req, res, next) {
    const { token } = req.body
    const user = jwt.verify(token,process.env.SECRET_KEY)
    const candidate = await User.findOne({where: { id: user.id } })
    if(candidate) {
      const cartCandidate = await Cart.findOne({ where: { userId: candidate.id }})
      if(!cartCandidate) {
        const cart = await Cart.create({ userId: candidate.id })
        return res.json({ cart })
      }
      return res.json({message: `Cart for user with id: ${user.id} already created.`}) 
    }
    return next(ApiError.badRequest(`User with ${user.id} no exists.`))
  }
  
  async add(req, res, next) {
    const { userId, productId } = req.body
    const candidate = await Cart.findOne({ where: { userId } })

    if(candidate) {
      const productCandidate = await Product.findOne({where: { id: productId } })
      if(productCandidate) {
        const cartProduct = await CartProduct.create({ productid: productId, cartId: candidate.id } )
        return res.json({cartProduct})
      }
    } 
    return res.json({message: `Cart for user with id: ${userId} no exists.`})
  }

  async get(req,res,next) {
    const { userId } = req.query
    const cart = await Cart.findOne({ where: { userId } })
    return res.json({ cart })
  }

}

module.exports = new CartController()
