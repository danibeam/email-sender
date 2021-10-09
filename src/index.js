const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors({ origin: "http://caktus.eu" }));
app.use(cors({ origin: "http://diesan.es" }));
app.use(require("./routes/index"));

app.listen(5002, () => {
  console.log("server on port 5002");
});
