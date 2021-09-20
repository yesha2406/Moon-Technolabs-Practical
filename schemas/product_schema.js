const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product_schema = Schema({
    _id: { type: String, default: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    sku: { type: String, required: true },
    category_id: { type: String, required: true }
});

product_schema.virtual('category', {
    ref: 'categories',
    localField: 'category_is',
    foreignField: '_id',
});

module.exports = mongoose.model("products", product_schema);