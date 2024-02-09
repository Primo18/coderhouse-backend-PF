import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'myprivate key';

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, PRIVATE_KEY, { expiresIn: '1h' });
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1]; // Bearer <token>
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;