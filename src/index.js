const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "https://gcpol.es");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(require("./routes/index"));

app.listen(5002, () => {
  console.log("HTTP server on port 5002");
});

https
  .createServer(
    {
      cert: fs.readFileSync(
        path.resolve(__dirname, "./../certificates/cert.pem")
      ),
      key: fs.readFileSync(
        path.resolve(__dirname, "./../certificates/key.pem")
      ),
    },
    app
  )
  .listen("443", () => {
    console.log("HTTPs server running on port 443");
  });
