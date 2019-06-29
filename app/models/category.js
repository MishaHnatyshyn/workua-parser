const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  originalName: { type: String, required: true },
  link: { type: String, required: true },
});


module.exports = mongoose.model('Category', categorySchema);
