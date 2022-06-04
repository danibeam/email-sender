const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/.netlify/functions/api", require("./routes/index"));
module.exports.handler = serverless(app);
