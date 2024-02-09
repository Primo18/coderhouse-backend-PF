import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';


const router = Router();

// Login user with GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// Callback for GitHub
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user._id }, 'myprivatekey', { expiresIn: '1h' });
    // Ideally, redirect to the frontend with the token included in the URL or set it in a cookie
    res.cookie('token', token, { httpOnly: true, secure: false }).redirect("/");
});

export default router;
