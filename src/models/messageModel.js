import mongoose from 'mongoose';

const MessagesSchema = new mongoose.Schema({
    user: String, // email del usuario
    message: String
});

export default mongoose.model('Message', MessagesSchema);
