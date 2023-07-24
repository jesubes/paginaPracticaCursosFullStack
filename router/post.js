const { Router } = require('express')
const multiparty = require('connect-multiparty')
const { asureAuth } = require('../middlewares/authenticated')
const { createPost, 
        getPost, 
        updatePost, 
        deletePost, 
        getOnePost} = require('../controllers/post')

//inicalizar multiparty
const md_upload = multiparty({ uploadDir: './uploads/blog'})

const route = Router()


//crear Un Post
route.post('/post',[
  asureAuth,
  md_upload
], createPost)


//todos los post
route.get('/post', getPost)


//Actualizar un Post
route.patch('/post/:id',[
  asureAuth,
  md_upload,
] ,updatePost)


//Eliminar un Post
route.delete('/post/:id', [
  asureAuth,
], deletePost )


//Traer un Post por path
route.get('/post/:path', getOnePost )


module.exports = route