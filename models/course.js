const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CourseShema = new mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
})

CourseShema.plugin(mongoosePaginate)

module.exports = mongoose.model('Course', CourseShema)