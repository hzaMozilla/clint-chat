import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

// Create Schema for Users
const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    lastMessage: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    }
});

export default Mongoose.model(
    'conversations',
    ConversationSchema
);
