const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../constants')


//ACCESS TOKEN - duarcion del access 3 horas
const createAccessToken = ( user ) =>{
  const expToken = new Date();
  expToken.setHours( expToken.getHours()+3);

  const payload = {
    token_type: 'access',
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  }

  return jwt.sign( payload, JWT_SECRET_KEY )
}


//REFRESH TOKEN - para refrescar el access token - 1 mes de caducidad
const createRefreshToken = ( user ) =>{
  const expToken = new Date();
  expToken.getMonth( expToken.getMonth() + 1 );

  const payload = {
    token_type: 'refresh',
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  }

  return jwt.sign( payload, JWT_SECRET_KEY )
}


//DECODIFICAR
const decoded = ( token ) =>{
  return jwt.decode( token, JWT_SECRET_KEY, true )
}



module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
}