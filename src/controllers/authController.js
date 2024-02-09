import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils.js';
import jwt from 'jsonwebtoken';

export const getHome = (req, res) => {
    // Si req.user es un documento de Mongoose, conviértelo en un objeto simple.
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
    res.clearCookie('token'); // Elimina la cookie que contiene el token JWT
    res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
};


export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = new User({ first_name, last_name, email, age, password: hashedPassword });
        await user.save();

        // JWT token
        const token = jwt.sign({ id: user._id }, 'myprivatekey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 });

        res.redirect('/login');
    } catch (error) {
        console.error('Register error:', error);
        res.redirect('/register');
    }
};

export const showRegisterForm = (req, res) => {
    res.render('register', { title: 'Register Page', style: 'register.css' });
};

export const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login Page', style: 'login.css' });
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect('/login');
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.redirect('/login');
        }
        req.user = user;

        const token = jwt.sign({ id: user._id }, 'myprivatekey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }).redirect("/profile");
    } catch (error) {
        console.error('Login error:', error);
        res.redirect('/login');
    }
};


export const showChangePasswordForm = (req, res) => {
    res.render('change-password', { title: 'Change Password Page', style: 'change-password.css' });
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        // Asumiendo que el ID del usuario viene del token JWT que se decodifica y se adjunta al req.user
        const userId = req.user.id; // Asegúrate de que el middleware JWT ya procesó el token y adjuntó el usuario
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

        const hashedPassword = await hashPassword(newPassword);
        await User.updateOne({ _id: userId }, { password: hashedPassword });

        res.redirect('/profile');
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: "An error occurred while changing the password." });
    }
};

