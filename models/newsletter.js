const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const newsletterSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true,
  }
})

newsletterSchema.plugin(paginate)

module.exports = mongoose.model('Newsletter', newsletterSchema)