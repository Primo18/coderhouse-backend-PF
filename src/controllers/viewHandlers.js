import viewService from '../services/viewService.js';

const renderPage = async (req, res, viewName, title, style) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const products = await viewService.getProductsForView({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        });

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
            style
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
        const { cid } = req.params;
        const cart = await viewService.getCartForView(cid);
        if (!cart) {
            throw new Error('No se pudo obtener el carrito');
        }
        res.render('cart', { cart: cart.toObject(), title: 'Cart', style: 'cart.css' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};
