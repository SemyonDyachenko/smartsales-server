const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: { type: DataTypes.STRING, unique: false },
  role: {type: DataTypes.STRING, defaultValue: 'CUSTOMER'}
})

const Cart = sequelize.define('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const CartProduct = sequelize.define('cart_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productid: { type: DataTypes.INTEGER, unique: false, notNull: true }
})

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: false, allowNull: false },
  price: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  img: { type: DataTypes.STRING, unique: false, allowNull: false },
  age: { type: DataTypes.STRING, unique: false, allowNull: false },
  description: { type: DataTypes.STRING, unique: false, allowNull: true }
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unqiue: true, allowNull: false}
})

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
  User,
  Cart,
  CartProduct,
  Product,
  Category
}

