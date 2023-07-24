const {Router} = require('express')
const multiparty  = require('connect-multiparty')
const { asureAuth } = require('../middlewares/authenticated')
const { createCourse, 
        getCourse, 
        updateCourse, 
        deleteCourse} = require('../controllers/course')

//iniciar multiparty
const md_upload = multiparty({ uploadDir: './uploads/course'})

const route = Router()


//rutas de cursos
route.post('/course',[
  asureAuth,
  md_upload,
], createCourse)


//trer todos los cursos
route.get('/course', getCourse)


//Actualizar un Curso
route.patch('/course/:id',[
  asureAuth,
  md_upload
], updateCourse)


//Eliminar Un Curso
route.delete('/course/:id',[
  asureAuth,
], deleteCourse)



module.exports = route