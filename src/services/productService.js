import productDao from '../dao/productDao.js';

class ProductService {
    async addProduct(productData) {
        // Aquí puedes agregar validación o lógica de negocio antes de crear el producto
        return await productDao.createProduct(productData);
    }

    async getProductById(productId) {
        // Puede incluir lógica adicional, como comprobar permisos o caché
        return await productDao.getProductById(productId);
    }

    async getAllProducts(queryParams) {
        // Puede incluir lógica de preprocesamiento de queryParams
        return await productDao.getAllProducts(queryParams);
    }

    async updateProductById(productId, updateData) {
        // Validar updateData o aplicar lógica de negocio aquí
        return await productDao.updateProductById(productId, updateData);
    }

    async deleteProductById(productId) {
        // Puede incluir comprobaciones de seguridad o lógica de limpieza aquí
        return await productDao.deleteProductById(productId);
    }

    // Obtener productos por categoría
    async getProductsByCategory(category) {
        return await productDao.getProductsByCategory(category);
    }
}

export default new ProductService();
