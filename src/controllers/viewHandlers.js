import viewService from '../services/viewService.js';
import userService from '../services/userService.js';

const renderPage = async (req, res, viewName, title, style) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const products = await viewService.getProductsForView({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        });

        // agregar contador de productos
        let count = 0;
        const userId = req.user._id; // Asumiendo que req.user está disponible gracias a Passport-JWT
        const cart = await userService.getCartsByUserId(userId);

        // Verifica si el usuario tiene un carrito y calcula la cantidad de productos
        if (cart && cart.products.length > 0) {
            count = cart.products.reduce((acc, item) => acc + item.quantity, 0);
        }

        if (!products) {
            throw new Error('No se pudieron obtener los productos');
        }

        res.render(viewName, {
            products: products.docs.map(product => product.toObject()),
            pagination: {
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
            },
            title,
            style,
            count
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const renderHomePage = async (req, res) => {
    await renderPage(req, res, 'home', 'Home', 'home.css');
};

export const renderRealTimeProducts = async (req, res) => {
    await renderPage(req, res, 'realTimeProducts', 'Real Time Products', 'realTimeProducts.css');
};

export const renderChat = async (req, res) => {
    await renderPage(req, res, 'chat', 'Chat', 'chat.css');
};

export const renderCartPage = async (req, res) => {
    try {
        // Asumiendo que req.user tiene la información del usuario autenticado, incluido su carrito
        const userId = req.user._id;
        const cart = await viewService.getCartForUser(userId);
        if (!cart) {
            throw new Error('No se pudo obtener el carrito');
        }
        res.render('cart', { cart: cart.toObject(), title: 'Cart', style: 'cart.css' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const renderContact = async (req, res) => {
    await renderPage(req, res, 'contact', 'Contact', 'contact.css');
};
