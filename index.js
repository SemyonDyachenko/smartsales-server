require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const models = require('./models/models')
const sequelize = require('./db')
const PORT = process.env.PORT | 5000
const router = require('./router')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileupload({}))
app.use('/api',router)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  }
  catch (e) {
    console.log(error)
  }
}

start()
