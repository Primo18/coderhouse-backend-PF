import mongoose from 'mongoose';
import cartDao from '../dao/cartDao.js';

class CartService {
    async createCart(cartData) {
        return cartDao.createCart(cartData);
    }

    async getCartById(cartId) {
        return cartDao.getCartById(cartId);
    }

    async getAllCarts() {
        return cartDao.getAllCarts();
    }

    async updateCartOps(cartId, ops) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const cart = await cartDao.getCartById(cartId).session(session);
            if (!cart) throw new Error('Carrito no encontrado');

            // Ejecuta las operaciones (ops) proporcionadas como argumento
            ops(cart);

            await cart.save();
            await session.commitTransaction();
            session.endSession();
            return cart;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error; // Re-throw el error para manejo externo
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        return this.updateCartOps(cartId, (cart) => {
            const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());
            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        });
    }

    async removeProductFromCart(cartId, productId) {
        return this.updateCartOps(cartId, (cart) => {
            cart.products = cart.products.filter(p => p.product.toString() !== productId.toString());
        });
    }

    async emptyCart(cartId) {
        return this.updateCartOps(cartId, (cart) => {
            cart.products = [];
        });
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return this.updateCartOps(cartId, (cart) => {
            const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());
            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity = quantity;
            } else {
                throw new Error('Producto no encontrado');
            }
        });
    }
}

export default new CartService();
