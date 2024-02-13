import cartService from '../services/cartService.js';


class CartController {
    // Crear un nuevo carrito
    async createCart(req, res) {
        try {
            const newCart = await cartService.createCart({});
            res.success(newCart);
        } catch (error) {
            res.error('Failed to create cart', 500);
        }
    }
    // Obtener todos los carritos
    async getAllCarts(req, res) {
        try {
            const result = await cartService.getAllCarts(req.query);
            res.success(result);
        } catch (error) {
            res.error('Failed to retrieve carts', 500);
        }
    }


    // Obtener un carrito por ID 
    async getCartById(req, res) {
        try {
            const { id } = req.params;
            const cart = await cartService.getCartById(id);
            if (!cart) {
                return res.notFound('Cart not found');
            }
            res.success(cart);
        } catch (error) {
            res.error('Failed to retrieve cart', 500);
        }
    }

    // Añadir un producto al carrito
    async addProductToCart(req, res) {
        try {
            const { cid } = req.params;
            const { pid, quantity } = req.body;
            const updatedCart = await cartService.addProductToCart(cid, pid, quantity);
            res.success(updatedCart);
        } catch (error) {
            res.error('Failed to add product to cart', 500);
        }
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartService.removeProductFromCart(cid, pid);
            res.success(updatedCart);
        } catch (error) {
            res.error('Failed to remove product from cart', 500);
        }
    }

    // Vaciar un carrito
    async emptyCart(req, res) {
        try {
            const { cid } = req.params;
            const updatedCart = await cartService.emptyCart(cid);
            res.success(updatedCart);
        } catch (error) {
            res.error('Failed to empty cart', 500);
        }
    }

    // Actualizar un carrito entero
    async updateCart(req, res) {
        try {
            const { cid } = req.params;
            const updatedCart = await cartService.updateCart(cid, req.body);
            res.success(updatedCart);
        } catch (error) {
            res.error('Failed to update cart', 500);
        }
    }

    // Actualizar la cantidad de un producto específico
    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartService.updateProductQuantity(cid, pid, quantity);
            res.success(updatedCart);
        } catch (error) {
            res.error('Failed to update product quantity', 500);
        }
    }
}

export default new CartController();
