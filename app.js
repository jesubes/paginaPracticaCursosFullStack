const express = require('express')
const { API_VERSION } = require('./constants')
const cors = require('cors')

const app = express();

//import routing
const authRoutes = require('./router/auth')
const userRoutes = require('./router/user')
const menuRoutes = require('./router/menu')
const courseRoutes = require('./router/course')
const postRoutes = require('./router/post')
const newsRoutes = require('./router/newsletter')

//configuracion del Body Parse - esta dentro de express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//configure static fold
app.use(express.static('uploads'))

//configure las CORS - para que cuando nuestro cliente haga peticiones las deje pasar y no las bloquee
app.use(cors())


//Configuracion de routing
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes)
app.use(`/api/${API_VERSION}`, courseRoutes)
app.use(`/api/${API_VERSION}`, postRoutes)
app.use(`/api/${API_VERSION}`, newsRoutes)


module.exports = app 