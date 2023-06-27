const express = require('express');
const bodyparser = require('body-parser');
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const user = new User();

        let checkusersemail = await User.find({email: body.data.email});
        if(checkusersemail.length != 0){
            res.end(JSON.stringify({status: "failed", data: "Email already exists"}));
            return;
        }
        let checkusersmobile = await User.find({mobileno: body.data.mobileno});
        if(checkusersmobile.length != 0){
            res.end(JSON.stringify({status: "failed", data: "Mobile no already exists"}));
            return;
        }

        user.name = body.data.name;
        user.email = body.data.email;
        user.mobileno = body.data.mobileno;
        user.address = body.data.address;
        user.password = body.data.password;

        user.save().then(result => {
            res.send(JSON.stringify({status: "success", data: result}));
        }, error => {
            res.send(JSON.stringify({status: "failed", data: error}));
        })
    } catch (error) {
        res.end(JSON.stringify({status: "failed", data: "Something went wrong!"}))
    }
})

router.post("/login", async(req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({email: body.data.email });
        if(user == null){
            res.end(JSON.stringify({status: "failed", data: "Email doesn't exists"}));
        }
        else {
            if(user.password == body.data.password){
                res.send(JSON.stringify({status: "success", data: user}));
            } else {
                res.end(JSON.stringify({status: "failed", data: "Invalid password!"}));
            }
        }

    } catch (error) {
        res.end(JSON.stringify({status: "failed", data: "Something went wrong!"}))
    }
})

module.exports = router;