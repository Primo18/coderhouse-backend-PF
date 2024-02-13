import CustomRouter from './CustomRouter.js';
import * as authController from '../controllers/authController.js';
import passport from 'passport';

class AuthRouter extends CustomRouter {
    init() {
        this.get("/login", ['PUBLIC'], authController.showLoginForm);
        this.get("/register", ['PUBLIC'], authController.showRegisterForm);
        this.get("/logout", ['AUTHENTICATED'], authController.logout);
        this.get("/profile", ['AUTHENTICATED'], authController.getProfile);
        this.get("/change-password", ['AUTHENTICATED'], authController.showChangePasswordForm);

        this.post("/api/register", ['PUBLIC'], passport.authenticate("signup", { session: false, failureRedirect: "/auth/register" }), authController.register);
        this.post("/api/login", ['PUBLIC'], passport.authenticate("login", { session: false, failureRedirect: "/auth/login" }), authController.login);
        this.post("/api/change-password", ['AUTHENTICATED'], authController.changePassword);

        // GitHub Auth Routes
        this.get("/github", ['PUBLIC'], passport.authenticate("github", { session: false }));
        this.get("/github/callback", ['PUBLIC'], passport.authenticate("github", { session: false, failureRedirect: "/auth/login" }), authController.loginWithGithub);
    }
}

export default new AuthRouter().getRouter();
