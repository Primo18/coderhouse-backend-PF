import express from "express";
import db from "./config/db.js";
import __dirname from "./utils.js";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import indexRouter from "./routes/indexRouter.js";
import sessionsRouter from "./routes/sessionsRouter.js";
import { engine } from "express-handlebars";
import passport from "passport";
import initPassport from "./config/passport.config.js";

const app = express();
const PORT = 3000;

// Connect to MongoDB
db.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

// Static files
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Configuring Handlebars
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({ mongoUrl: 'mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/clase_20?retryWrites=true&w=majority' }),
        secret: 'mysecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 6000000
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport();

// Routes
app.use("/", indexRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});