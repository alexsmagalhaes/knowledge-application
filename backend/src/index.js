const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swaggerConfig");

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
  .then("./src/schedule/statsSchedule.js")
  .then("./src/config/routes.js")
  .into(app);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_, res) => {
  res.send("Server is online");
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
