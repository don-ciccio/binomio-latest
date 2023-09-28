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
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                store: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Store",
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
            country: {
                type: String,
                required: true,
            },
            phoneNo: {
                type: String,
                required: [true, "Please add a valid phone number"],
            },
        },
        paymentMethod: {
            type: String,
            default: "COD",
        },
        paymentInfo: {
            id: {
                type: String,
            },
            status: {
                type: String,
            },
            update_time: {
                type: String,
            },
            email_address: {
                type: String,
            },
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
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
        deliveredAt: {
            type: Date,
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
