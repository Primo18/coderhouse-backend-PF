import express from 'express';
import __dirname from './utils/pathUtils.js';
// import messagesRoutes from './routes/messageRoutes.js';
import path from "path";
import handlebars from "express-handlebars";
import authRoutes from './routes/authRoutes.js';
import { Server } from "socket.io";
import db from "./config/db.js";
import passport from "passport";
import initPassport from "./config/passport.config.js";
import viewRoutes from './routes/viewRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

// Database connection
db.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
const publicPath = path.join(__dirname, "../../public");
app.use(express.static(publicPath));

// Template engine - Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, '../views'));
app.engine(
    "hbs",
    handlebars.engine(
        {
            extname: ".hbs",
            defaultLayout: "main.hbs",
            layoutsDir: path.join(__dirname, "../views/layouts"),
        }
    )
);

// Server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Passport 
app.use(passport.initialize());
initPassport();

// Socket.io
const io = new Server(server);

// Middleware para adjuntar io a req
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use('/', viewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
// app.use('/api/messages', messagesRoutes);
app.use('/auth', authRoutes);

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    socket.on("deleteProduct", async (productId) => {
        console.log("Delete product with ID:", productId);
        const deleted = await productController.deleteProductSocket(productId);
        if (deleted) {
            io.sockets.emit("productDeleted", productId);
        }
    });

    socket.on("newProduct", (product) => {
        console.log("New product:", product);
        io.sockets.emit("productAdded", product);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
