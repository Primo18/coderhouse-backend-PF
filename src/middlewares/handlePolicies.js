import passport from 'passport';

const handlePolicies = (policies) => {
    return (req, res, next) => {
        // Si el usuario ya está autenticado y la ruta es pública, redirigir al home
        if (req.user && policies.includes('PUBLIC')) {
            return res.redirect('/');
        }

        // Acceso público, no requiere autenticación
        if (policies.includes('PUBLIC')) {
            return next();
        }

        // Para rutas que requieren autenticación, utiliza Passport
        if (policies.includes('AUTHENTICATED')) {
            return passport.authenticate('jwt', { session: false }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    // return res.unauthorized('Authentication failed.').redirect('/auth/login');
                    return res.redirect('/auth/login');
                }
                req.user = user; // Almacenar el usuario autenticado en la solicitud

                // Comprobar roles o políticas adicionales aquí si es necesario
                const userRole = user.role ? user.role.toUpperCase() : '';
                if (policies.length > 1 && !policies.includes(userRole)) {
                    // Si hay políticas adicionales y el rol del usuario no está incluido, denegar el acceso
                    return res.unauthorized('You do not have permission to access this resource.');
                }

                return next();
            })(req, res, next);
        }

        // Si llegamos aquí sin manejar la solicitud, denegar el acceso por defecto
        return res.unauthorized('Access denied.');
    };
};

export default handlePolicies;
