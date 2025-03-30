const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require("mongoose");

require("dotenv").config();
require("./config/mongodb");

app.db = db;

app.mongoose = mongoose;

const PORT = process.env.PORT;

consign()
  .include("./src/config/passport.js")
  .then("./src/config/middlewares.js")
  .then("./src/api/validation.js")
  .then("./src/api")
  .then("./src/config/routes.js")
  .into(app);

app.get("/", (_, res) => {
  res.send("Server is online");
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
