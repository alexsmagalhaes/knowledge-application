const app = require("express");
const consign = require("consign");

consign().then("./config/middlewares.js").into(app);

console.log("Is running!")
