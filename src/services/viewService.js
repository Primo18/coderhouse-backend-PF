import productService from './productService.js';
import userService from './userService.js';
import cartService from './cartService.js';

class ViewService {
    async getProductsForView(options) {
        return productService.getAllProducts(options);
    }

    async getCartForUser(userId) {
        const cart = await userService.getCartsByUserId(userId);
        return cartService.getCartById(cart);

    }
}

export default new ViewService();
