const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error('You must provide a valid email address')
        }
      },
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(value) {
        if (value === 'password') {
          throw new Error('Password is too weak.')
        }
      },
    },

    tokens: [
      {
        token: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

UserSchema.virtual('contacts', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'creator',
})

UserSchema.methods.toJSON = function () {
  const user = this.toObject()

  delete user.password
  delete user.tokens

  return user
}

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this

  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {
    expiresIn: '7 days',
  })

  user.tokens = user.tokens.concat({token})

  await user.save()

  return token
}

UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    const hashedPass = await bcrypt.hash(user.password, 8)
    user.password = hashedPass
  }

  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
