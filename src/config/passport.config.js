import passport from 'passport';
import userService from '../services/userService.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['token']; // Asegúrate de reemplazar 'nombreDeTuCookie' con el nombre real de tu cookie
        }
        return token;
    }]),
    secretOrKey: 'secret'
};

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "Iv1.edeeaa849b214240";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "a36de3fe25eba801faa2a436cf19cbbc85baaa4a";
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "http://localhost:8080/auth/github/callback";

const initPassport = () => {
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const userExists = await userService.getUserByEmail(email);
            if (userExists) {
                return done(null, false, { message: 'Email already registered' });
            }

            const hashedPassword = await hashPassword(password);
            const newUser = await userService.createUser({
                ...req.body,
                password: hashedPassword
            });

            return done(null, newUser);
        } catch (error) {
            done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getUserByEmail(profile.emails[0].value);
            if (!user) {
                user = await userService.addGithubUser(profile);
            }

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await userService.getUserById(jwtPayload.id);
            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));
};

export default initPassport;
