const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errors");
const MongoStore = require("connect-mongo");
const express = require("express");

dotenv.config();
const app = express();

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    ttl: 20000,
    touchAfter: 24 * 3600,
});
app.use(cookieParser());

app.use(
    session({
        store: sessionStore,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false, // don't create session until something stored
        resave: false,
        cookie: {
            secure: true, // if true only transmit cookie over https
            httpOnly: true, // if true prevent client side JS from reading the cookie
            expires: new Date(
                Date.now() +
                    process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
            ),
        },
    })
);

// global middlewares
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.CLIENT_URL],
        credentials: true,
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

// Import all routes
const auth = require("./routes/auth");
const products = require("./routes/product");
const categories = require("./routes/category");
const stores = require("./routes/store");
const content = require("./routes/content");
const orders = require("./routes/order");

app.use("/api", auth);
app.use("/api", products);
app.use("/api", categories);
app.use("/api", orders);
app.use("/api", stores);
app.use("/api", content);

module.exports = app;
