// cartRoutes.js
import CustomRouter from './CustomRouter.js';
import cartController from "../controllers/CartController.js";

class CartRoutes extends CustomRouter {
    init() {
        this.get("/", ['PUBLIC'], cartController.getAllCarts);
        this.get("/:cid", ['PUBLIC'], cartController.getCartById);
        this.post("/", ['AUTHENTICATED'], cartController.createCart);
        this.put("/:cid", ['AUTHENTICATED'], cartController.updateEntireCart);
        this.delete("/:cid", ['AUTHENTICATED'], cartController.emptyCart);

        this.post("/:cid/products", ['AUTHENTICATED'], cartController.addProductToCart);
        this.put("/:cid/products/:pid", ['AUTHENTICATED'], cartController.updateProductQuantity);
        this.delete("/:cid/products/:pid", ['AUTHENTICATED'], cartController.removeProductFromCart);
    }
}

export default new CartRoutes().getRouter();
