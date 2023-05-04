const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth.js");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//Mongoose setup
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen("");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app listenning on port ${port}`);
});
