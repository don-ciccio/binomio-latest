const app = require("./app");
const connectDatabase = require("./config/database");

// Connecting to database
connectDatabase();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT || 5000}`);
});
