const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseSlugPlugin = require("mongoose-slug-plugin");
const { getAddressCordinates } = require("../utils/location");

const storeSchema = new Schema({
    isOpen: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        required: true,
    },
    shopAddress: {
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
    },
    deliveryRadius: { type: Number, default: 5, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: { type: [Number], index: "2dsphere" },
        formattedAddress: String,
    },
    numOrders: {
        type: Number,
        default: 0,
    },
    blackOutDays: [{ type: Date }],
});

// Geocode & create location
storeSchema.pre("save", async function (next) {
    const API_KEY = process.env.GOOGLE_API_KEY;

    let address = `${this.shopAddress.address} ${this.shopAddress.postalCode} ${this.shopAddress.city} `;
    const loc = await getAddressCordinates(address, API_KEY);

    this.location = {
        type: "Point",
        coordinates: [loc.data.lng, loc.data.lat],
        formattedAddress: loc.formattedAddress,
    };

    // Do not save address
    this.shopAddress = undefined;
    next();
});

storeSchema.index({
    name: "store",
});

storeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
