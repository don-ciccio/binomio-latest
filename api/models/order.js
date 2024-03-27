const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Counter = require("./counter");

const orderSchema = mongoose.Schema(
    {
        orderId: {
            type: Number,
            default: 0,
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        orderItems: [
            {
                image: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                id: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                store: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Store",
                },
                timestamp: {
                    type: Number,
                    required: true,
                },
            },
        ],
        shippingInfo: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            details: {
                type: String,
            },
            country: {
                type: String,
            },
            phoneNo: {
                type: String,
            },
            date: {
                type: Date,
                required: true,
            },
            time: {
                type: Number,
                required: true,
            },
            notes: {
                type: String,
            },
        },
        paymentMethod: {
            type: String,
            default: "COD",
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        orderStatus: {
            type: String,
            required: true,
            default: "Processing",
        },
    },
    { timestamps: true }
);

orderSchema.pre("save", function (next) {
    // A logic to have a counter for OrderId as mongoose don't support autoIncrement like SQL
    // Whenever Order database is updating get the counter and assign the new value to OrderId
    if (this.isNew) {
        let order = this;
        let updatedOrderValue = 0;
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
                    updatedOrderValue = counter.count;
                    await counter.save();
                } else {
                    updatedOrderValue = res.count;
                }

                order.orderId = updatedOrderValue;
                next();
            }
        );
    } else {
        next();
    }
});

module.exports = mongoose.model("Order", orderSchema);
