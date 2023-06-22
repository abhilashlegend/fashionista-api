const express = require('express');
const bodyparser = require('body-parser');
const Product = require('../models/Product');
const router = express.Router();
const fs = require('fs');



router.post("/save", async(req, res) => {
    try {
        const body = req.body;
        const product = new Product();
        if(body.data.id != ""){
            productcategory = await Product.findById(body.data.id);
        }
        product.pcid = body.data.pcid;
        product.name = body.data.name;
        product.description = body.data.description;
        product.specification = body.data.specification;
        product.mrp = body.data.mrp;
        product.price = body.data.price;
        product.varieties = body.data.varieties;
        product.instock = body.data.instock;
        product.isactive = body.data.isactive;
        let base64image = body.data.imagePath;
        if(base64image != ""){
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\*;base64,/, "");
            product.imagePath = "products/" + randomname + ".png";
            fs.writeFile("assets/" + product.imagePath, base64image, 'base64', function(err){
                if(err)
                    console.log("Error while saving image " + err);
            });        
        }
        product.save().then(result => {
            res.end(JSON.stringify({status: "success", data: result}));
        }, err => {
            res.end(JSON.stringify({status: "failed", data: err}));
        })
    } catch (error) {
        res.end(JSON.stringify({status: "failed", data: "Something went wrong! Error: " + error}));
    }
})

module.exports = router;