import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  second_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: Number
  },
  vat: {
    type: Number,
    require: true
  },
  howMan: {
    type: String,
    default: 'buyer'
  }
});

export default Mongoose.model('user', UserSchema);
