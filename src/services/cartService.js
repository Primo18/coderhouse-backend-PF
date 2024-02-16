import mongoose from 'mongoose';
import cartDao from '../dao/cartDao.js';
import userDao from '../dao/userDao.js';

class CartService {
    // async createCart(cartData) {
    //     return cartDao.createCart(cartData);
    // }

    async getCartById(cartId) {
        return cartDao.getCartById(cartId);
    }

    // async getAllCarts() {
    //     return cartDao.getAllCarts();
    // }

    // async updateCartOps(cartId, ops) {
    //     const session = await mongoose.startSession();
    //     session.startTransaction();
    //     try {
    //         const cart = await cartDao.getCartById(cartId).session(session);
    //         if (!cart) throw new Error('Carrito no encontrado');

    //         // Ejecuta las operaciones (ops) proporcionadas como argumento
    //         ops(cart);

    //         await cart.save();
    //         await session.commitTransaction();
    //         session.endSession();
    //         return cart;
    //     } catch (error) {
    //         await session.abortTransaction();
    //         session.endSession();
    //         throw error; // Re-throw el error para manejo externo
    //     }
    // }

    async addProductToCart(userId, productId, quantity) {
        // Obtener el usuario para acceder a su carrito
        let user = await userDao.getUserById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        let cart;

        if (!user.cart) {
            // Si el usuario no tiene un carrito, crea uno nuevo y actualiza el usuario
            cart = await cartDao.createCart({ products: [] });
            await userDao.assignCartToUser(userId, cart._id);
        } else {
            // Si el usuario ya tiene un carrito, obtén ese carrito
            cart = await cartDao.getCartById(user.cart);
        }

        // Asegura que el carrito tenga la estructura adecuada para productos
        if (!cart.products) cart.products = [];

        // Buscar si el producto ya existe en el carrito
        const existingProductIndex = cart.products.findIndex(p => p.product._id.toString() === productId);

        if (existingProductIndex >= 0) {
            // Actualizar la cantidad si el producto ya existe
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Añadir el producto al carrito si no existe
            cart.products.push({ product: productId, quantity });
        }

        // Guardar los cambios en el carrito
        await cart.save();

        return cart;
    }

    async emptyCart(userId) {
        let user = await userDao.getUserById(userId);
        if (!user || !user.cart) {
            throw new Error('Carrito no encontrado.');
        }
        const cart = await cartDao.getCartById(user.cart);
        cart.products = []; // Vaciar el arreglo de productos
        await cart.save();
        return cart;
    }

}

export default new CartService();
