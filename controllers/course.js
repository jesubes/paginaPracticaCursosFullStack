
const { request, response } = require('express')
const Course = require('../models/course')
const { getFileName } = require('../utils/image')


//funtion
const createCourse = async(req, res) =>{
  const course = new Course(req.body)

  const imagePath = getFileName(req.files.miniature)
  course.miniature = imagePath;

  try{
    const payload = await course.save()
    res.send({ payload: payload })

  } catch( error ){
    console.log( error );
    res.status( 400 ).send({ msg: 'Error al guardar el curso'})
  }
}


//Traer Los cursos con paginación - Metodo paginado
const getCourse = async (req, res) =>{
  const {page = 1, limit = 10 } = req.query;

  const options = {
    page: parsesInt(page),
    limit: parseInt(limit),
  }

  try{
    await Course.paginate({},options, (error, courses)=>{
      if( error ){
        res.status(400).send({ msg: 'Error al obtener los cursos'})
      } else{
        res.send({ payload: courses })
      }
    })

  }catch( error ){
    res.status( 400 ).send({ msg: 'error al optener los cursos'})
  }
}



//actulizar un Curso
const updateCourse = async ( req = request, res = response )=> {
  const { id } = req.params

  const courseData = req.body;

  if( req.files.miniature ){
    const imagePath = getFileName( req.files.miniature );
    courseData.miniature = imagePath;
  }

  try{
    payload = await Course.findByIdAndUpdate({_id: id}, courseData, {new: true})
    res.send({ 
      msg: 'Actulizacion OK',
      payload
    })
  } catch( error ){
    console.log( error );
    res.send({ msg: 'No encontro el id del curso a Actualizar'})
  }
}



//delete un Curso
const deleteCourse = async ( req = request, res = response ) =>{
  const { id } = req.params

  try{
    const payload = await Course.findByIdAndDelete({_id: id })
    res.send({ 
      msg: 'Eliminado OK',
      payload,
    })
  } catch ( error ){
    console.log(error);
    res.status( 400 ).send({ msg: 'Error al Eliminar el curso por ID'})
  }
}





module.exports = {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
}