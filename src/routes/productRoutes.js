import CustomRouter from './CustomRouter.js';
import productController from "../controllers/ProductController.js";

class ProductRoutes extends CustomRouter {
    init() {
        this.get("/", ['PUBLIC'], productController.getAllProducts);
        this.get("/:id", ['PUBLIC'], productController.getProductById);
        this.post("/", ['AUTHENTICATED'], productController.addProduct);
        this.put("/:id", ['AUTHENTICATED'], productController.updateProductById);
        this.delete("/:id", ['AUTHENTICATED'], productController.deleteProductById);
    }
}

export default new ProductRoutes().getRouter();
