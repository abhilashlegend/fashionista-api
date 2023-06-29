const express = require('express');
const bodyparser = require('body-parser');
const Order = require("../models/Order");

const router = express.Router();

router.post("/place", async (req, res) => {
    try {
        const body = req.body;
        const order = new Order();
        order.userid = body.data.userid;
        order.orderdate = body.data.orderdate;
        order.address = body.data.address;
        order.city = body.data.city;
        order.state = body.data.state;
        order.pincode = body.data.pincode;
        order.totalamount = body.data.pincode;
        order.shipmentamount = body.data.shipmentamount;
        order.billamount = body.data.billamount;
        order.status = "pending";
        order.products = body.data.products;
        order.save().then(result => {
            res.send(JSON.stringify({status: "success", data: result}));
        }, error => {
            res.end(JSON.stringify({status: "failed", data: "Error: " + error}));
        })
        
    } catch (error) {
        res.end(JSON.stringify({status: "failed", data: "Something went wrong!" + error}))
    }
});

router.patch("/markpaid", async(req, res) => {
    try {
        const body = req.body;
        const order = await Order.findByIdAndUpdate(body.data.id, {$set: {status: "paid"}}, {new: true});
        res.send(JSON.stringify({status: "success", data: "Payment marked successfully"}));
    } catch (error) {
        res.end(JSON.stringify({status: "failed", data: "Something went wrong!" + error}));
    }
})

module.exports = router;