const axios = require("axios");

module.exports = (app) => {
  const { existsOrError } = app.src.api.validation;

  const save = async (req, res) => {
    const message = { ...req.body };

    try {
      existsOrError(message.type, "Type not provided!");
      existsOrError(message.description, "Details not provided!");

      await axios.post("https://api.trello.com/1/cards", null, {
        params: {
          key: process.env.TRELLO_KEY || "",
          token: process.env.TRELLO_SECRET || "",
          idList: process.env.TRELLO_ID_LIST || "",
          name: message.type,
          desc: message.description,
        },
      });

      return res.status(201).send();
    } catch (err) {
      if (typeof err === "string") {
        return res.status(400).send(err);
      }

      return res.status(400).send("Could not create the card");
    }
  };

  return { save };
};
