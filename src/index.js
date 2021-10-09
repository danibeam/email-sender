const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes/index"));
app.use(cors());

app.listen(5002, () => {
  console.log("server on port 5002");
});
