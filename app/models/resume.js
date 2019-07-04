const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const resumeSchema = mongoose.Schema({
  meta: { type: String, default: '' },
  link: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  photo: {
    type: {
      alt: { type: String, default: '' },
      url: { type: String, default: '' }
    },
    default: { alt: '', url: '' }
  },
  fullName: { type: String, required: true },
  salary: { type: String, default: '' },
  position: { type: [String], required: true },
  availability: { type: [String], default: [] },
  personal: {
    type: {
      age: { type: Number, default: null },
      city: { type: String, default: '' },
      relocation: { type: String, default: '' },
    },
    default: {
      age: null,
      city: '',
      relocation: ''
    }
  },
  experience: {
    type: Array,
    default: []
  },
  education:
    {
      type: Array,
      default: []
    },
  additionalEducation: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  languages: { type: [String], default: [] },
  additionalInfo: { type: [String], default: [] },
  timestamp: { type: Date, default: new Date() }
});

resumeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Resume', resumeSchema);
