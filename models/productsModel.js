const mongoose = require("mongoose");

const Products = mongoose.model("Products", {
    name: String,
    description: String,
    price: Number,
    img_url: String,
    stock: Number,
});

module.exports = Products;