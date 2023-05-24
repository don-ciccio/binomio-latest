const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((con) => {
            console.log(
                `MongoDB Database connected to HOST: ${con.connection.host}`
            );
        });
};

module.exports = connectDatabase;
