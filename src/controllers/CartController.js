import cartService from '../services/cartService.js';
import userService from '../services/userService.js';


class CartController {
    // Crear un nuevo carrito
    // async createCart(req, res) {
    //     try {
    //         const newCart = await cartService.createCart({});
    //         const userId = req.user._id;
    //         await userService.assignCartToUser(userId, newCart._id);
    //         res.success(newCart);
    //     } catch (error) {
    //         res.error('Failed to create cart', 500);
    //     }
    // }

    // // Obtener todos los carritos
    // async getAllCarts(req, res) {
    //     try {
    //         const result = await cartService.getAllCarts(req.query);
    //         res.success(result);
    //     } catch (error) {
    //         res.error('Failed to retrieve carts', 500);
    //     }
    // }


    // // Obtener un carrito por ID 
    // async getCartById(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const cart = await cartService.getCartById(id);
    //         if (!cart) {
    //             return res.notFound('Cart not found');
    //         }
    //         res.success(cart);
    //     } catch (error) {
    //         res.error('Failed to retrieve cart', 500);
    //     }
    // }

    // Añadir un producto al carrito
    async addProductToCart(req, res) {
        try {
            const userId = req.user._id;
            const { pid, quantity } = req.body;
            const updatedCart = await cartService.addProductToCart(userId, pid, quantity);
            res.json({ success: true, message: 'Producto añadido al carrito', cart: updatedCart });
        } catch (error) {
            res.json({ success: false, message: 'Error al añadir el producto al carrito', error: error.message });
        }
    }

    async getCartItemCount(req, res) {
        try {
            const userId = req.user._id; // Asumiendo que req.user está disponible gracias a Passport-JWT
            const cart = await userService.getCartsByUserId(userId);

            // Verifica si el usuario tiene un carrito y calcula la cantidad de productos
            if (cart && cart.products.length > 0) {
                const count = cart.products.reduce((acc, item) => acc + item.quantity, 0);
                res.json({ count });
            } else {
                res.json({ count: 0 }); // Envía 0 si no hay carrito o si el carrito está vacío
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to get cart item count', error: error.message });
        }
    }



    // // Eliminar un producto del carrito
    // async removeProductFromCart(req, res) {
    //     try {
    //         const { cid, pid } = req.params;
    //         const updatedCart = await cartService.removeProductFromCart(cid, pid);
    //         res.success(updatedCart);
    //     } catch (error) {
    //         res.error('Failed to remove product from cart', 500);
    //     }
    // }

    // Vaciar un carrito

    async emptyCart(req, res) {
        try {
            const userId = req.user._id; // Asumiendo que req.user contiene la información del usuario autenticado
            const cart = await cartService.emptyCart(userId);
            res.json({ success: true, message: 'Carrito vaciado con éxito', cart });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al vaciar el carrito', error: error.message });
        }
    }


    // // Actualizar un carrito entero
    // async updateCart(req, res) {
    //     try {
    //         const { cid } = req.params;
    //         const updatedCart = await cartService.updateCart(cid, req.body);
    //         res.success(updatedCart);
    //     } catch (error) {
    //         res.error('Failed to update cart', 500);
    //     }
    // }

    // // Actualizar la cantidad de un producto específico
    // async updateProductQuantity(req, res) {
    //     try {
    //         const { cid, pid } = req.params;
    //         const { quantity } = req.body;
    //         const updatedCart = await cartService.updateProductQuantity(cid, pid, quantity);
    //         res.success(updatedCart);
    //     } catch (error) {
    //         res.error('Failed to update product quantity', 500);
    //     }
    // }
}

export default new CartController();
