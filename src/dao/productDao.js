import Product from '../models/productModel.js';

class ProductDao {
    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async getAllProducts({ limit = 10, page = 1, query = {}, sort = { price: 1 } }) {
        limit = parseInt(limit);
        page = parseInt(page);

        // Filtrar por estado disponible o categoría según el query
        let filter = {};
        if (query.status) {
            filter.status = query.status === 'available';
        }
        if (query.category) {
            filter.category = query.category;
        }

        return await Product.paginate(filter, { limit, page, sort });
    }

    async updateProductById(productId, updateData) {
        return await Product.findByIdAndUpdate(productId, updateData, { new: true });
    }

    async deleteProductById(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

export default new ProductDao();


