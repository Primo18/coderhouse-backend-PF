import CustomRouter from './CustomRouter.js';
import { renderHomePage, renderRealTimeProducts, renderChat, renderCartPage, renderContact } from '../controllers/viewHandlers.js';

class ViewRouter extends CustomRouter {
    init() {
        this.get('/', ['AUTHENTICATED'], renderHomePage);
        this.get('/chat', ['PUBLIC'], renderChat);
        this.get('/products', ['PUBLIC'], renderHomePage);
        this.get('/realtimeproducts', ['PUBLIC'], renderRealTimeProducts);
        this.get('/carts', ['AUTHENTICATED'], renderCartPage);
        this.get('/contact', ['AUTHENTICATED'], renderContact);
    }
}

export default new ViewRouter().getRouter();
