var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());
app.get("/api/products", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./db.json", { encoding: "utf-8" })));
});

app.listen(3005);
