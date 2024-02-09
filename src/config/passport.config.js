import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userService from '../models/User.js';
import { hashPassword, comparePassword } from '../utils.js';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['token']; // Asegúrate de reemplazar 'nombreDeTuCookie' con el nombre real de tu cookie
        }
        return token;
    }]),
    secretOrKey: 'myprivatekey'
};

const LocalStrategy = passportLocal.Strategy;
const GITHUB_CLIENT_ID = "Iv1.edeeaa849b214240";
const GITHUB_CLIENT_SECRET = "a36de3fe25eba801faa2a436cf19cbbc85baaa4a";
const GITHUB_CALLBACK_URL = "http://localhost:3000/api/sessions/githubcallback";


// Serialize user
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

const initPassport = () => {
    // Register a new user
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true  // permite que la función de verificación reciba el objeto req como primer argumento
    }, async (req, email, password, done) => {
        try {
            // Extraer datos adicionales del req.body
            const { first_name, last_name, age } = req.body;

            // Buscar si ya existe un usuario con ese email
            const existingUser = await userService.findOne({ email });

            if (existingUser) {
                // Si el usuario ya existe, no se crea uno nuevo y se devuelve un error o mensaje
                return done(null, false, { message: 'Email already registered' });
            }

            // Si el usuario no existe, se crea uno nuevo
            const hashedPassword = await hashPassword(password);
            const newUser = new userService({ first_name, last_name, email, age, password: hashedPassword });
            await newUser.save();

            // Devolver el nuevo usuario creado
            return done(null, newUser);
        } catch (error) {
            done(error);
        }
    }));

    // Login user with email and password (Local Strategy)
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            // Buscar el usuario en la base de datos
            const user = await userService.findOne({ email });

            // Si el usuario no existe, devolver un mensaje de error
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            // Si el usuario existe, verificar que la contraseña sea correcta
            const isMatch = await comparePassword(password, user.password);

            // Si la contraseña no es correcta, devolver un mensaje de error
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            // Si la contraseña es correcta, devolver el usuario
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    // Login user with GitHub
    passport.use('github', new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                // Buscar el usuario en la base de datos por su email
                let user = await userService.findOne({ email: profile._json.email });

                // Si el usuario no existe, crear un nuevo usuario
                if (!user) {
                    user = new userService({
                        first_name: profile._json.name,
                        email: profile._json.email,
                        password: ""
                    });
                    await user.save();
                }

                // Devolver el usuario
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    ));

    // Login user with JWT
    passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            // Buscar el usuario en la base de datos por su id
            const user = await userService.findById(jwtPayload.id);

            // Si el usuario no existe, devolver un mensaje de error
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            // Si el usuario existe, devolver el usuario
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));
};

export default initPassport;

