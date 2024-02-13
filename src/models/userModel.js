import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Referencia al modelo Cart
    role: { type: String, default: 'user' },
});

// Aplicar el plugin de paginación a userSchema
userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

export default User;
