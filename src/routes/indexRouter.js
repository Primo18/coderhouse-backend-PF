import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { ensureAuthenticated, redirectIfAuthenticated, authenticateAndGenerateToken, optionalAuthentication } from "../middlewares/authMiddleware.js";
import passport from "passport";

const router = Router();


router.get("/", optionalAuthentication, authController.getHome);
router.get("/profile", ensureAuthenticated, authController.getProfile);
router.get("/logout", ensureAuthenticated, authController.logout);
router.get("/register", redirectIfAuthenticated, authController.showRegisterForm);
router.get("/login", redirectIfAuthenticated, authController.showLoginForm);
router.get("/change-password", ensureAuthenticated, authController.showChangePasswordForm);
router.post("/api/change-password", ensureAuthenticated, authController.changePassword);
router.post("/api/register", redirectIfAuthenticated, passport.authenticate("signup", { failureRedirect: "/register" }), authController.showLoginForm);
router.post('/api/login', authenticateAndGenerateToken);

export default router;