// cartRoutes.js
import CustomRouter from './CustomRouter.js';
import cartController from "../controllers/CartController.js";

class CartRoutes extends CustomRouter {
    init() {
        // this.get("/", ['PUBLIC'], cartController.getAllCarts);
        // this.get("/:cid", ['PUBLIC'], cartController.getCartById);
        // this.post("/", ['AUTHENTICATED'], cartController.createCart);
        // this.put("/:cid", ['AUTHENTICATED'], cartController.updateCart);
        // this.put("/:cid/products/:pid", ['AUTHENTICATED'], cartController.updateProductQuantity);
        // this.delete("/:cid/products/:pid", ['AUTHENTICATED'], cartController.removeProductFromCart);
        // this.get("/count", ['AUTHENTICATED'], cartController.getCartItemCount);

        this.post("/addProduct", ['AUTHENTICATED'], cartController.addProductToCart);
        this.post('/emptyCart', ['AUTHENTICATED'], cartController.emptyCart);
    }
}

export default new CartRoutes().getRouter();
