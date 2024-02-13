import { Router } from 'express';
import handlePolicies from '../middlewares/handlePolicies.js';

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.applyGlobalMiddleware();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {
        // La lógica de inicialización de las rutas se definirá en las clases derivadas
    }

    // Método applyRoute ajustado para incluir handlePolicies
    applyRoute(method, path, policies, handlers) {
        // Se asume que 'policies' es un array de strings, por ejemplo ['USER', 'ADMIN']
        const wrappedHandlers = handlers.map(h => this.applyCallback(h));
        this.router[method](path, handlePolicies(policies), ...wrappedHandlers);
    }

    // Ajusta los métodos para recibir un arreglo de políticas en lugar de un booleano 'requireAuth'
    get(path, policies = [], ...handlers) {
        this.applyRoute('get', path, policies, handlers);
    }

    post(path, policies = [], ...handlers) {
        this.applyRoute('post', path, policies, handlers);
    }

    put(path, policies = [], ...handlers) {
        this.applyRoute('put', path, policies, handlers);
    }

    delete(path, policies = [], ...handlers) {
        this.applyRoute('delete', path, policies, handlers);
    }

    // 2. Centralización de la configuración de respuestas
    // generateCustomResponses también podría ser un nombre adecuado
    applyGlobalMiddleware() {
        this.router.use((req, res, next) => {
            res.success = (data) => res.status(200).json({ data });
            res.error = (message, statusCode = 400) => res.status(statusCode).json({ error: message });
            res.notFound = (message = 'Not Found') => res.status(404).json({ error: message });
            res.unauthorized = (message = 'Unauthorized') => res.status(401).json({ error: message });
            next();
        });
    }

    // 3. Manejo de errores robusto en applyCallback
    applyCallback(handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res, next);
            } catch (error) {
                console.error(error); // Log del error
                res.error('An unexpected error occurred.', 500); // Respuesta genérica de error
            }
        };
    }
}
