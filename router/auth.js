const express = require('express')
const { register, login, refreshAccessToken } = require('../controllers/auth');

const router  = express.Router();

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/refresh_access_token', refreshAccessToken )

module.exports = router; 
