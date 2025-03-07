const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

app.db = db;

const PORT = 3000;

consign()
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
