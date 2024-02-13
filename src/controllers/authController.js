import userService from '../services/userService.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import jwt from 'jsonwebtoken';

// Asegúrate de configurar estas variables de entorno adecuadamente
const JWT_SECRET = 'secret';

export const getHome = (req, res) => {
    const userObj = req.user ? req.user.toObject() : null;
    res.render('home', { title: 'Home', style: 'home.css', user: userObj });
};

export const getProfile = (req, res) => {
    const { first_name, last_name, email, age, role } = req.user;
    res.render('profile', {
        role, first_name, last_name, email, age, title: 'Profile Page', style: 'profile.css'
    });
};

export const logout = (req, res) => {
    res.clearCookie('token'); // Asegúrate de que el nombre de la cookie sea el correcto
    res.redirect('/auth/login');
};

export const login = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false }).redirect('/');
    }
    catch (error) {
        console.error('Login error:', error);
        res.redirect('/auth/login');
    }
};

export const register = async (req, res) => {
    try {
        // Redirecciona al login en lugar de autenticar automáticamente al usuario
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Register error:', error);
        res.redirect('/auth/register');
    }
};

export const showRegisterForm = (req, res) => {
    res.render('register', { title: 'Register Page', style: 'register.css' });
};

export const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login Page', style: 'login.css' });
};


export const showChangePasswordForm = (req, res) => {
    res.render('change-password', { title: 'Change Password Page', style: 'change-password.css' });
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        res.redirect('/auth/profile');
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: "An error occurred while changing the password." });
    }
};

export const loginWithGithub = async (req, res) => {
    // Esta función se invocaría después del callback de autenticación de GitHub
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false }).redirect('/');
};


