const Menu = require('../models/menu')

const createMenu = async ( req, res)=>{
  const menu = new Menu( req.body )

  try{
    const payload = await menu.save()
    res.send({ payload: payload})

  } catch( error ){
    console.log(error);
    res.status(400).send({ msg: 'Error al crear un menu'})
  }
}


//traer todos los menus
const getMenu = async ( req, res ) =>{
  const { active  } = req.query;

  let response = null

  if( active == undefined ){
    response = await Menu.find().sort({ order: 'asc'});
    
  } else {
    response = await Menu.find({ active }).sort({ order: 'asc'})
  }

  if(!response){
    res.status(400).send({ msg: 'No hay menus'})
  } else{
    res.send({ payload: response })
  }
}



//actualiazar Menu
const updateMenu = async ( req, res )=>{
  const { id } = req.params;

  const menuData = req.body
 
  try{
    const payload = await Menu.findByIdAndUpdate({_id: id}, menuData, {new: true} )
    res.send({ payload: payload})
  } catch( error ){
    console.log( error );
    res.status(400).send({ msg: 'Error en el Id de usuario'})
  }

}



//elimar Menu 
const deleteMenu = async ( req, res ) => {
  const { id } = req.params

  try{
    const payload = await Menu.findByIdAndDelete({_id: id})
    res.send({
      msg: 'Eliminado OK',
      payload: payload,
    })

  } catch( error ){
    console.log( error );
    res.status( 400 ).send({ msg: 'Error del id al eliminar menu'})
  }
}



module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
};