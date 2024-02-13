import Cart from '../models/cartModel.js';

class CartDao {
    async createCart(cartData) {
        const cart = new Cart(cartData);
        await cart.save();
        return cart;
    }

    async getCartById(cartId) {
        return Cart.findById(cartId).populate('products.product').exec();
    }

    async getAllCarts() {
        return Cart.find().exec();
    }

    async updateCart(cartId, updateData) {
        return Cart.findByIdAndUpdate(cartId, updateData, { new: true }).exec();
    }

    async deleteCart(cartId) {
        return Cart.findByIdAndDelete(cartId).exec();
    }

}

export default new CartDao();


