const { Cart, CartProduct } = require('../models/models')

class CartController {
  
  async add(req, res, next) {
    const { userId, productId } = req.body
    const candidate = Cart.findOne({ where: { userId } })
    if(candidate) {
      
    }
  }

  async get(req,res,next) {
    const { userId } = req.query
    const cart = await Cart.findOne({ where: { userId } })
    return res.json({ cart })
  }

}

module.exports = new CartController()
