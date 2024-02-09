import passport from 'passport';
import jwt from 'jsonwebtoken';

export const ensureAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            // Manejar el caso en que no haya un usuario autenticado por el token JWT
            return res.status(401).json({ message: "No autorizado" });
        }
        req.user = user; // Adjuntar el usuario al objeto de solicitud
        next();
    })(req, res, next);
};

export const redirectIfAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (user) {
            // Si hay un usuario autenticado, redirigir a otro lugar
            return res.redirect('/profile');
        }
        next(); // Si no hay usuario, simplemente continuar
    })(req, res, next);
};


// Middleware para autenticar y generar token
export const authenticateAndGenerateToken = (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login'); // O manejar como prefieras
        }
        // Usuario autenticado, generar token
        const token = jwt.sign({ id: user._id }, 'myprivatekey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 });
        return res.redirect('/profile');
    })(req, res, next);
};

// Este middleware intenta autenticar al usuario pero no bloquea el acceso a la ruta
export const optionalAuthentication = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (user) {
            // Si hay un usuario, adjuntarlo al objeto req
            req.user = user;
        }
        // Continuar con la solicitud independientemente del estado de autenticación
        next();
    })(req, res, next);
};
