const mongoose = require("mongoose");
const express = require("express");
mongoose.set("strictQuery", true);
var cors = require("cors");

const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();

// var corsOptions = {
//   origin: "https://instareact10x.onrender.com",
//   optionsSuccessStatus: 200,
// };
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(
  process.env.Database_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);
app.use("/", router);
app.listen(8000, () => console.log("App listening on port 8000"));
