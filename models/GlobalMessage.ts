import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

// Create Schema for Users
const GlobalMessageSchema = new Schema({
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

export default Mongoose.model(
    'global_messages',
    GlobalMessageSchema
);
