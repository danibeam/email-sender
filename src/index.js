const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/.netlify/functions/index", require("./routes/index"));

// app.listen(5002, () => {
//   console.log("server on port 5002");
// });

module.exports.handler = serverless(app);
