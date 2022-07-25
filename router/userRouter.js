const Router = require('express')
const router = Router()
const authMiddleware = require('../middleware/AuthMiddleware')
const userController = require('../controllers/UserController')
router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/auth', authMiddleware, userController.auth)



module.exports = router
