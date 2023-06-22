const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    pcid: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    specification: {type: String, required: true},
    mrp: {type: Number, required: true},
    price: {type: Number, required: true},
    varieties: [],
    instock: {type: String, required: true},
    isactive: {type: String, required: true},
    imagePath: {type: String}
});

const Product = mongoose.model("products", schema);
module.exports = Product;
