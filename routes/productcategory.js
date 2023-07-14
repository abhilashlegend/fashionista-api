const express = require('express');
const bodyparser = require('body-parser');
const Productcategory = require('../models/Productcategory');
const router = express.Router();
const fs = require('fs');

router.post("/save", async(req, res) => {
    try {
        const body =  req.body;
        const productcategory = new Productcategory();
        if(body.data.id != ""){
            productcategory = await Productcategory.findById(body.data.id);
        }
        productcategory.name = body.data.name;
        productcategory.srno = body.data.srno;
        let base64image = body.data.image;
        if(base64image != ""){
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\/\w+;base64,/, "");
            productcategory.imagePath = "productcategories/" + randomname + ".png";
            await fs.writeFile('assets/' + productcategory.imagePath, base64image, 'base64', function(err) {
                if(err)
                    console.log("Error while saving image " + err);
            })
        }
        productcategory.save().then(result => {
            res.end(JSON.stringify({status: "success", data: result}));   
        }, err =>{
            res.end(JSON.stringify({status: "failed", data: err}))
        })    
    } catch (error) {
        res.end(JSON.stringify({status: "failed", data: "Something went wrong!"}));
    }
    
});

router.get("/list", async(req, res) => {
    try {
        let productcategories = await Productcategory.find();
        res.end(JSON.stringify({status: "success", data: productcategories}))    
    } catch (error) {
        res.end(JSON.stringify({status: "failure", data: "Something went wrong!"}));
    }
});

router.get("/get/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const productcategory = await Productcategory.findById(id);
        res.send(JSON.stringify({status: "success", data: productcategory}));
    } catch (error) {
        res.send(JSON.stringify({status: "failure", data: "Something went wrong!" + error}));
    }
});

router.delete("/delete/:id", async(req, res) => {
    try {
        const id = req.params.id;
        await Productcategory.findByIdAndDelete(id);
        res.end(JSON.stringify({status: "success"}));
    } catch (error) {
        res.end(JSON.stringify({status: "failed", data: "Something went wrong!"}))
    }
});


module.exports = router;