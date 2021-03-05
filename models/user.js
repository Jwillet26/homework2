const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  ssn: {
    type: String,
    required: true,
    unique: true,
    min: 11,
    max: 11,
    validate: {
      validator(value) {
        return /\d(3)-\d(2)-\d(4)/.test(value);
      },
    },
  },
  fName: {
    type: String, required: true
  },
  lname: {
    type: String, required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
    min: 12,
    max: 12,
    validate: {
      validator(value) {
        return /\d(3)-\d(3)-\d(4)/.test(value);
      }
    }
  },
},{
toJSON: {
    getters: true,
    virtuals: false,
    },
}));
