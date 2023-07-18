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
});

router.get("/list", async (req, res) => {
    try {
        const products = await Product.find();
        if(products){
            res.send(JSON.stringify({status: "success", data: products}));
        } else {
            res.send(JSON.stringify({status: "failure", data: "No products found"}))
        }   
    } catch (error) {
        res.end(JSON.stringify({status: "failure", data: "Error: " + error}));
    }
})

router.get("/getbypcid", async(req, res) => {
    try {
        const body = req.body;
        const pcid = body.data.pcid;

        if(pcid != ""){
            const products = await Product.find({pcid: pcid});
            res.end(JSON.stringify({status: "success", data: products}))
        } else {
            res.end(JSON.stringify({status: "failure", data: "Error: Please enter pcid"}));
        }
    } catch (error) {
        res.end(JSON.stringify({status: "failure", data: "Error: " + error}));
    }
});

router.get("/get/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.send(JSON.stringify({status: "success", data: product}));
    } catch (error) {
        res.end(JSON.stringify({status: "failure", data: "Error: " + error}));        
    }
});

router.delete("/delete", async(req, res) => {
    try {
        let body = req.body;
        await Product.findByIdAndDelete(body.data.id);
        res.end(JSON.stringify({status: "success"}));
    } catch (error) {
        res.end(JSON.stringify({status: "failure", data: "Error: " + error}));    
    }
});

router.post("/savevariety", async (req, res) => {
    try {
        const body = req.body;
        let product = new Product();
        product = await Product.findById(body.data.id);
        product.varieties.push(body.data.variety);
        product.save().then(result => {
            res.send(JSON.stringify({status: "success", data: result}));
        }, err => {
            res.send(JSON.stringify({status: "failure", data: err}));
        })
    } catch (error) {
        res.end(JSON.stringify({status: "failure", data: "Error: " + error}));  
    }
});

router.post("/deletevariety", async (req, res) => {
    try {
        let body = req.body;
        let product = new Product();
        product = await Product.findById(body.data.id);
        let varieties = [];
        for(let i = 0; i < product.varieties.length; i++){
            if(product.varieties[i].color != body.data.variety.color || product.varieties[i].color != body.data.variety.size){
                varieties.push(product.varieties[i]);
            }
        }
        product.varieties = varieties;
        product.save().then(result => {
            res.send(JSON.stringify({status: "success", data: result}));
        }, err => {
            res.send(JSON.stringify({status: "failed", data: err}));
        })


    } catch (error) {
        res.end(JSON.stringify({status: "failure", data: "Error: " + error})); 
    }
})

module.exports = router;