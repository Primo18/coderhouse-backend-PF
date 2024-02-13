import productService from '../services/productService.js';

class ProductController {
    // Obtener todos los productos
    async getAllProducts(req, res) {
        try {
            const result = await productService.getAllProducts(req.query);
            const response = {
                docs: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
            };
            res.success(response);
        } catch (error) {
            res.error('Failed to retrieve products', 500);
        }
    }

    // Obtener un producto por ID
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            if (!product) {
                return res.notFound('Product not found');
            }
            res.success(product);
        } catch (error) {
            res.error('Failed to retrieve product', 500);
        }
    }

    // Añadir un nuevo producto
    async addProduct(req, res) {
        try {
            const newProduct = await productService.addProduct(req.body);
            res.success(newProduct);
        } catch (error) {
            res.error('Failed to add product', 500);
        }
    }

    // Actualizar un producto por ID
    async updateProductById(req, res) {
        try {
            const { id } = req.params;
            const updatedProduct = await productService.updateProductById(id, req.body);
            if (!updatedProduct) {
                return res.notFound('Product not found');
            }
            res.success(updatedProduct);
        } catch (error) {
            res.error('Failed to update product', 500);
        }
    }

    // Eliminar un producto por ID
    async deleteProductById(req, res) {
        try {
            const { id } = req.params;
            const deletedProduct = await productService.deleteProductById(id);
            if (!deletedProduct) {
                return res.notFound('Product not found');
            }
            res.success(deletedProduct);
        } catch (error) {
            res.error('Failed to delete product', 500);
        }
    }
}

export default new ProductController();
