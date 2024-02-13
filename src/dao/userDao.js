import User from '../models/userModel.js';

class UserDao {
    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async getUserById(userId) {
        return User.findById(userId).exec();
    }

    async getUserByEmail(email) {
        return User.findOne({ email }).exec();
    }

    async updateUser(userId, updateData) {
        return User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    }

    async deleteUser(userId) {
        return User.findByIdAndDelete(userId).exec();
    }

    async assignCartToUser(userId, cartId) {
        return User.findByIdAndUpdate(userId, { cart: cartId }, { new: true }).exec();
    }
}

export default new UserDao();
