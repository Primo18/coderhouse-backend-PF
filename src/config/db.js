import mongoose from 'mongoose';

const uri = 'mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/clase_20?retryWrites=true&w=majority';

const connection = mongoose.connect(uri);

export default connection;
