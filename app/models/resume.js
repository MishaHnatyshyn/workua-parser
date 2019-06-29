const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const resumeSchema = mongoose.Schema({
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
  salary: { type: Number, default: null },
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
    type: [
      {
        company: String,
        description: String,
        position: String,
        time: String
      }
    ],
    default: []
  },
  education:
    {
      type: [
        {
          department: String,
          profession: String,
          time: String,
          type: String,
          university: String
        }
      ],
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
