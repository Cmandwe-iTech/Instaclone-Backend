const mongoose = require("mongoose")
const express = require("express")
mongoose.set('strictQuery', true)
const routes = require("./routes")
var cors = require('cors') 

const bodyParser = require("body-parser");

const app = express();

app.use(cors(corsOptions))
var corsOptions = {
    origin: 'https://instareact10x.onrender.com',
    optionsSuccessStatus: 200 
  }
app.use("/",routes)  
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
mongoose.connect(process.env.Database_url,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("connected to db")
})
app.listen(8000, () => console.log("App listening on port 8000"))