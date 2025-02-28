const bcript = require("bcrypt-nodejs");

module.exports = (app) => {
  const { existsOrError, equalsError, notExistsOrError } =
    app.src.api.validation;

  const encryptPassword = (password) => {
    const salt = bcript.genSaltSync(10);

    return bcript.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, "Name not provided!");
      existsOrError(user.email, "Email not provided!");
      existsOrError(user.password, "Password not provided!");
      existsOrError(
        user.confirmPassword,
        "Password confirmation not provided!"
      );
      equalsError(user.password, user.confirmPassword, "Passwords don't match");

      const userFromDB = await app
        .db("users")
        .where({ email: user.email })
        .first();

      if (!user.id) notExistsOrError(userFromDB, "User is already registered!");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(req.body.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then((_) => {
          res.status(204).send();
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => {
          res.status(204).send();
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  };

  const get = (_, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };

  return { save, get };
};
