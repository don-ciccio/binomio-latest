const app = require("./app");
const connectDatabase = require("./config/database");
const https = require("https");
const fs = require("fs");

// Connecting to database
connectDatabase();

const options = {
    cert: fs.readFileSync(
        "/etc/letsencrypt/live/api.noboringcoffee.com/fullchain.pem"
    ),
    key: fs.readFileSync(
        "/etc/letsencrypt/live/api.noboringcoffee.com/privkey.pem"
    ),
};

const server = https.createServer(options, app);

server.listen(process.env.PORT || 443, () => {
    console.log(`Listening on port ${process.env.PORT || 443}`);
});
