import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'secret'; // Debería estar en variables de entorno

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, PRIVATE_KEY, { expiresIn: '1h' });
};
