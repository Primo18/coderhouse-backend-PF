import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const connection = mongoose.connect(uri);

export default connection;
