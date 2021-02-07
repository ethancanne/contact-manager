const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
  }
)

const contactModel = mongoose.model('Contact', contactSchema)

module.exports = contactModel
