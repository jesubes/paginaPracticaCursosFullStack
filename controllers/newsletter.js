const { request } = require('express');
const Newsletter = require('../models/newsletter')


//funtions
//crear news
const suscribeEmail = async( req, res )=>{
  const { email } = req.body;
  
  if (!email) return res.status( 400 ).send({ msg: 'El email es obligatorio'})

  try{
    const newletter = new Newsletter({
      email: email.toLowerCase(),
    })

    const payload = await newletter.save()
    res.send({ payload })

  } catch( error ){
    console.log( error );
    res.status( 400 ).send({ msg: 'Error, ya esta registrado el email'})
  }
}


//Trer los email con paginate
const getEmails = async ( req = request, res ) =>{
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt( page ),
    limit: parseInt( limit )
  }

  try{
    await Newsletter.paginate({}, options, (error, news) =>{
      if( error ){
        res.status(400).send({msg: 'Error al paginar'})
      } else{
        res.send({ payload: news})
      }
    })

  } catch( error ){
    console.log( error );
    res.status(400).send({ msg: 'Error en paginacion de Emails'})
  }
}


//Eliminar
const deleteEmail = async( req, res) =>{
  const { id } = req.params;

  try{
    const payload = await Newsletter.findByIdAndDelete({_id: id})
    res.send({
      msg: 'Eliminado OK',
      payload,
    })

  } catch( error ){
    console.log( error );
    res.status(400).send({ msg: 'Error al elimar el usuario'})
  }
}


module.exports ={
  suscribeEmail,
  getEmails,
  deleteEmail,
}