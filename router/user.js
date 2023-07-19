const {Router } = require('express')
const multiparty = require('connect-multiparty')
const {
  getMe, 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser } = require('../controllers/user')
const { asureAuth } = require('../middlewares/authenticated')


const router = Router()
//middleware para cargar archivo en la app con una direccion raiz
md_upload = multiparty({ uploadDir: './uploads/avatar'})


router.get('/user/me',[ 
  asureAuth
],getMe)


router.get('/users',[
  asureAuth
], getUsers)


router.post('/user',[
  asureAuth,
  md_upload,
], createUser)


router.patch('/user/:id', [
  asureAuth,
  md_upload,
], updateUser)


router.delete('/user/:id',[
  asureAuth,
], deleteUser)



module.exports = router;
