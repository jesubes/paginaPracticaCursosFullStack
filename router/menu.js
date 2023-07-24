
const {Router} = require('express')
const {asureAuth}  = require('../middlewares/authenticated');
const { createMenu, getMenu, updateMenu, deleteMenu } = require('../controllers/menu');


const route = Router();


//endpoint
route.post('/menu',[
  asureAuth
], createMenu)


route.get('/menu', getMenu)


route.patch('/menu/:id',[
  asureAuth
], updateMenu )


route.delete('/menu/:id',[
  asureAuth
], deleteMenu)


module.exports = route; 