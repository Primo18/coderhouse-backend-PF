// Middleware para redirigir al home si ya está autenticado
function redirectIfAuthenticated(req, res, next) {
    if (req.user) {
        // Si req.user existe, significa que el usuario ya está autenticado
        return res.redirect('/');
    }
    next(); // Si no está autenticado, continúa con el siguiente middleware o controlador
}

export default redirectIfAuthenticated;