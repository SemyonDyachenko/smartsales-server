const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')


class ProductController {
  async create(req, res, next) {
    try {
    const { name, price, description, age, categoryId } = req.body
    const { img } = req.files

    let fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname,'..','static',fileName))
  
    const product = await Product.create({name, price, img: fileName, description, age})
    res.json({message: 'Product was created.',product})
    }
    catch(error) {
      next(ApiError.internal(error))
    }
  }

  async getAll(req,res,next) {
    const products = await Product.findAll()   
    return res.json({ products })
  }

  async get(req,res,next) {
    const { id } = req.query
    const product = await Product.findOne({ where: { id } })
    return res.json( { product } )
  }

}

module.exports = new ProductController()
