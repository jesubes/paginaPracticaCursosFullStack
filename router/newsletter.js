const { Router } = require('express');
const { suscribeEmail, getEmails, deleteEmail } = require('../controllers/newsletter');
const { asureAuth } = require('../middlewares/authenticated');



const router = Router();

//rutas
//registrar
router.post('/newsletter', suscribeEmail)


//traer los Email registrados con paginate
router.get('/newsletter',[
  asureAuth
], getEmails )


//Elimiar un Registro
router.delete('/newsletter/:id', [
  asureAuth
], deleteEmail)


module.exports = router