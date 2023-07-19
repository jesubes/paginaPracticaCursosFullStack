const bcrypt = require('bcryptjs')
const file = require('connect-multiparty')
const User = require("../models/user")
const { getFileName } = require('../utils/image')



//TRAE UN USUARIO
const getMe = async (req, res) =>{
  const { user_id } = req.user

  const userFound = await User.findById(user_id)

  if(!userFound){
    return res.status(400).send({ msg: 'Usuario no existe'})
  } else{
    res.send({ payload: userFound })
  }
}



//TRAE TODOS LOS USUARIOS
const getUsers = async( req, res ) =>{
  const { active } = req.query

   let  usersFind = null;

  try{
    if( active === undefined ){
      usersFind = await User.find();
    }else {
      usersFind = await User.find({active})
    }
    res.send( usersFind )

  } catch( error ){
    console.log(error);
    res.status(400).send('Error parametros query!')
  }
}



//CREAR USUARIO
const createUser = async (req, res) =>{
  const { password } = req.body
  const user = new User({ ...req.body, active: false})
  const salt = bcrypt.genSaltSync(10)
  const hasPassword = bcrypt.hashSync( password, salt)
  user.password = hasPassword;


  if(req.files.avatar){

    const imagePath = getFileName(req.files.avatar)

    user.avatar = imagePath
  }
  
  try{
    const payload = await user.save();
    res.send( {payload: payload} )
    
  } catch(error){
    console.log(error)
  }

}


//actualizar Usuario  
const updateUser = async (req, res) =>{
  const { id } = req.params;
  const userData = req.body;

  if(userData.password){
    const salt = bcrypt.genSaltSync(10)
    const hasPasword = bcrypt.hashSync( userData.password, salt )
    userData.password = hasPasword;
  } else {
    delete userData.password;
  }

  if(req.files.avatar){
    const imagePath = getFileName(req.files.avatar)
    userData.avatar = imagePath;
  }

  try{
    await User.findByIdAndUpdate({ _id: id }, userData)
    res.send({ msg: 'usuario actualizado'})
  } catch(error){
    console.log(error);
    res.status( 400 ).send({msg: 'Usuario incorrecto'})
  }
}


//eliminar usuario
const deleteUser = async ( req, res )=>{
  const { id  } = req.params;

  try{
    await User.findByIdAndDelete({_id: id});
  res.send({ msg: 'Usuario Borrado con exito!'})

  } catch( error ){
    console.log(error)
    res.status(400).send({ msg: 'Error al borrar'})
  }

}


module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}