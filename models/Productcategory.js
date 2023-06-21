const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const schema = new Schema({
    name: {type: String, required: true},
    srno: {type: Number, required: true},
    imagePath: {type: String}
});

let Productcategory = mongoose.model("productcategories", schema);
module.exports = Productcategory;
