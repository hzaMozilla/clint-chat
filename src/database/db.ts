import config from 'config';
import mongoose from 'mongoose';

const db = config.get('mongoURI');

const connectDB = async (_params?: any) => {
  console.log('MongoDB Connecting...');
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
export default connectDB;
