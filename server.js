require("dotenv").config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const app = express()
const connUri = process.env.db_url
const port = process.env.port || 8000
const route = require("./Routes/index");

app.use(cors())
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
    })
)
app.use(bodyParser.json());
mongoose.promise = global.Promise;
mongoose.connect(connUri,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const connection = mongoose.connection
connection.once("open",()=> console.log("Database connection established successfully"))
connection.on("error",(err) => {
    console.log("Database connection error :"+err)
    process.exit()
})
route(app)
app.use(express.static(__dirname));
app.listen(port,()=>console.log("server running on:"+port))


