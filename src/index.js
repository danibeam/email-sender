const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes/index"));
app.use(
  cors({
    origin: ["http://caktus.eu", "https://gcpol.es/", "http://gcpol.es"],
  })
);

// app.listen(5002, () => {
//   console.log("HTTP server on port 5002");
// });

https.createServer({}, app).listen("5002", () => {
  console.log("HTTPs port 5002");
});

// https
//   .createServer(
//     {
//       cert: fs.readFileSync(
//         path.resolve(__dirname, "./../certificates/cert.pem")
//       ),
//       key: fs.readFileSync(
//         path.resolve(__dirname, "./../certificates/key.pem")
//       ),
//     },
//     app
//   )
//   .listen("443", () => {
//     console.log("HTTPs server running on port 443");
//   });
