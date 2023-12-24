const express = require("express");
const app = express();

app.use(express.json());

app.use("/*", (req, res) => {
  res.status(200).send("<h1>You hit our base url </h1>");
});

module.exports = app;
