const express = require("express");
const app = express.Router();
const api = require("../controller/api");

app.get("/", api.index);
app.post("/login", api.login);
app.get("/logout", api.logout);
module.exports = app;
