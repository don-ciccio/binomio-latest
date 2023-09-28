const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./counter");

const tableSchema = new Schema({
    tableId: {
        type: Number,
        default: 0,
        unique: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    seats: {
        type: Number,
        default: true,
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: "Store",
        required: false,
    },
    reservation: {
        type: mongoose.Schema.ObjectId,
        ref: "Reservation",
        required: false,
    },
});

tableSchema.pre("save", function (next) {
    // A logic to have a counter for OrderId as mongoose don't support autoIncrement like SQL
    // Whenever Order database is updating get the counter and assign the new value to OrderId
    if (this.isNew) {
        let table = this;
        let updatedTableValue = 0;
        Counter.findOneAndUpdate(
            { _id: "entity" },
            { $inc: { count: 1 } },
            { new: true, useFindAndModify: false },
            async (err, res) => {
                if (!res) {
                    const counter = new Counter({
                        _id: "entity",
                        count: 1000,
                    });
                    updatedTableValue = counter.count;
                    await counter.save();
                } else {
                    updatedTableValue = res.count;
                }

                table.tableId = updatedTableValue;
                next();
            }
        );
    } else {
        next();
    }
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
