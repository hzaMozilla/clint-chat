import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'conversations'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
});

export default Mongoose.model('messages', MessageSchema);
