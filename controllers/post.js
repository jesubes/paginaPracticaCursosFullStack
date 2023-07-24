const { request, response } = require('express')
const Post = require('../models/post');
const { getFileName } = require('../utils/image');

//funtions


//Traer todos los post
const getPost = async( req = request, res = response ) =>{
  const { page= 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt( limit ),
    sort: { created_at: 'desc' },
  }

  await Post.paginate({}, options, ( error, postPayload) =>{
    if( error ){
      console.log( error );
      res.status(400).send({msg: 'Error al Traer los Post'})
    } else{
      res.send({ postPayload })
    }
  })
}



//Crar un Post
const createPost = async( req, res ) =>{
  const post = new Post( req.body );
  post.created_at = new Date();

  const imagePath = getFileName( req.files.miniature )
  post.miniature = imagePath

  try{
    const payload = await post.save();
    res.send({
      msg: 'Guardado OK',
      payload
    })
  } catch( error ){
    console.log( error );
    res.status( 400 ).send({ msg: 'Error al guardar el Post'})
  }
}



//Actualizar un Post
const updatePost = async( req, res ) =>{
  const { id } = req.params

  const postData = req.body;

  if( req.files.miniature ){
    const imagePath = getFileName( req.files.miniature )
    postData.miniature = imagePath;
  }

  try{
    const payload = await Post.findByIdAndUpdate({_id: id}, postData ,{ new: true })
    res.send({
      msg: 'Actulizado OK',
      payload
    })

  } catch( error ){
    console.log( error );
    res.status( 400 ).send({ msg: 'Error al Actualizar el Post'})
  }
}



//Eliminar un Post
const deletePost = async ( req, res ) =>{
  const { id } = req.params;

  try{
    const payload = await Post.findByIdAndDelete({ _id: id })
    res.send({ 
      msg: 'Elimado OK',
      payload,
    })

  } catch( error ){
    console.log( error );
    res.status( 400 ).send({ msg: 'Errorr al Eliminar el Post por Id'})
  }
}



//Traer un Post por path
const getOnePost = async( req, res) =>{
  const { path } = req.params;

  try{
    const payload = await Post.findOne({ path: path});
    res.send({ payload })

  } catch ( error ){
    console.log( error );
    res.status( 500 ).send({ msg: 'Error al Cargar el Path'})
  }
}




module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getOnePost,
}