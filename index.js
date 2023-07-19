const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static("assets"));
app.use(express.json());
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH");
        return res.status(200).json({});
    }   
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/fashionistaDB');
let db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("Connection established"));

app.get("/", (req, res) => {
    res.send("This is home page");
    res.end();
})

app.use("/admin", require("./routes/admin"));
app.use("/productcategory", require("./routes/productcategory"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));


app.listen(8080, () => {
    console.log("server is now listening to http://localhost:8080/");
})
