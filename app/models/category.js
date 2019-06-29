const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  originalName: { type: String, required: true },
  link: { type: String, required: true },
});


module.exports = mongoose.model('Category', categorySchema);
