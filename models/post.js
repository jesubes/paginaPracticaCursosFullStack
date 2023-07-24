const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')


const PostSchema = new mongoose.Schema({
  title: String,
  miniature: String,
  content: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    unique: true,
  },
  created_at: Date,
})

PostSchema.plugin(paginate)

module.exports = mongoose.model('Post', PostSchema)