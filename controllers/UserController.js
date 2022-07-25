const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/token')


class UserController {
  
  async signup(req,res,next) {
    const { email, password ,role } = req.body
    
    if(!email && !password) {
      return next(ApiError.badRequest('Data is empty.'))
    }

    const candidate = await User.findOne({ where: { email } })
    
    if(candidate) {
      return next(ApiError.badRequest('User already created'))
    }
    const hashPassword = await bcrypt.hash(password,5)
    const user = await User.create( { email, role, password: hashPassword } )
    
    const token = generateToken(user.id,user.email,user.role)
    return res.json({token})
  }

  async login(req,res,next) {
    const { email, password } = req.body
    
    if(!email && !password) {
      return next(ApiError.badRequest('Data is empty.'))
    }

    const user = await User.findOne({ where: { email } })
    if(!user) {
      return next(ApiError.badRequest("User don't exists"))
    }
    const comparePassword = bcrypt.compareSync(password,user.password)
    if(!comparePassword) {
      return next(ApiError.internal('Not validate password'))
    }
    const token = generateToken(user.id,user.email,user.role)
    return res.json({token})
  } 

  async auth(req,res,next) {
    const token = generateToken(req.user.id,req.user.email,req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController()
