const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errors");

const express = require("express");

dotenv.config();
const app = express();

var sess = {
    secret: "keyboard cat",
    cookie: {},
    resave: true,
    saveUninitialized: true,
};

if (app.get("env") === "PRODUCTION") {
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

// global middlewares
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.CLIENT_URL],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

// Import all routes
const auth = require("./routes/auth");
const products = require("./routes/product");
const categories = require("./routes/category");
const stores = require("./routes/store");

app.use("/api", auth);
app.use("/api", products);
app.use("/api", categories);
app.use("/api", stores);

module.exports = app;
