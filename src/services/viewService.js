import productService from './productService.js';
import cartService from './cartService.js';

class ViewService {
    async getProductsForView(options) {
        // Utiliza productService para obtener los productos
        return productService.getAllProducts(options);
    }

    async getCartForView(cartId) {
        // Utiliza cartService para obtener el carrito
        return cartService.getCartById(cartId);
    }
}

export default new ViewService();
