const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('../utils/jwt')


//register
const register = async ( req, res) => {
    console.log('Se ha ejecutado el registro');

    const { firstname, lastname, email, password, role } = req.body;
    
    if( !email ) res.status( 400 ).send({ msg: 'El email es obligatorio'})

    if( !password ) res.status( 400 ).send({ msg: 'El password es obligatorio'})

    const user = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      role: "user",
      active: false
    })

    const salt = bcrypt.genSaltSync( 10 )
    const hashPassword = bcrypt.hashSync( password, salt)

    user.password = hashPassword;
    try{
      let mostrar = await user.save();
      res.send({
        mostrar
      })

    }catch(error){
       console.error('Error al crear un usuario!', error)
       res.status( 400 ).send('Error al crear un usuario!!!')
    }
}   



//login
const login = async ( req, res ) =>{
  const { email, password  } = req.body
  
  if( !email ) res.status( 400 ).send( { msg: 'El email es obligatorio'})
  if( !password ) res.status( 400 ).send( { msg: 'La contraseña es obligatoria'})

  const emailLowerCase = email.toLowerCase();

  try{
    const userFind = await User.findOne({ email: emailLowerCase })
    bcrypt.compare( password, userFind.password, ( bcryptError, check ) =>{
      if( bcryptError ) {
        res.status( 500 ).send({ msg: 'Error del servidor'})
      } else if (!check) {
        res.status( 400 ).send({ msg: 'Usuario y/o contraseña incorrecta'})
      } else if( !userFind.active ){
        res.status( 401 ).send({ msg: 'Usuario no autorizado o no activo'})
      } else{
        res.send({ 
          access: jwt.createAccessToken( userFind ),
          refresh: jwt.createRefreshToken( userFind )
        })
      }
    })
  } catch ( error ){
    console.log('Error del servidor', error )
    res.status( 500 ).send({ msg: 'Error del servicodr '})
  }
}


//refresh token
const refreshAccessToken = async( req, res )=> {
  const { token } = req.body;

  if( !token )  return res.status( 400 ).send({ msg: 'Token requerido!!!'});

  const { user_id } = jwt.decoded( token ); // CONTROLAR EL ERROR CUANDO EL TOQUEN NO ES EL VALIDO
  try{
    const userFind = await User.findOne({ _id: user_id });
    if( !userFind ){
      return res.status( 400 ).send({ msg: 'Usuario no encontrado'})
    }else{
      res.send({
        accessToken: jwt.createAccessToken( userFind )
      })
    }

  }catch ( error ){
    console.log(error)
    res.status( 500 ).send({ msg: 'Error del servidor'})
  }
}

module.exports = {
  register,
  login,
  refreshAccessToken
}