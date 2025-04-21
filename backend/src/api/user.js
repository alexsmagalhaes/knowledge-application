const bcript = require("bcrypt-nodejs");

module.exports = (app) => {
  const { existsOrError, equalsError, notExistsOrError } =
    app.src.api.validation;

  const encryptPassword = (password) => {
    const salt = bcript.genSaltSync(10);

    return bcript.hashSync(password, salt);
  };

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Users operations
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: John Doe
   *               email:
   *                 type: string
   *                 example: johndoe@example.com
   *               password:
   *                 type: string
   *                 example: password123
   *               confirmPassword:
   *                 type: string
   *                 example: password123
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Validation error
   */

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update an existing user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The user ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: John Doe
   *               email:
   *                 type: string
   *                 example: johndoe@example.com
   *               password:
   *                 type: string
   *                 example: newpassword123
   *               confirmPassword:
   *                 type: string
   *                 example: newpassword123
   *     responses:
   *       200:
   *         description: User updated successfully
   *       400:
   *         description: Validation error or missing required fields
   *       404:
   *         description: User not found
   */
  const save = async (req, res) => {
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    if (!req.originalUrl.startsWith("/users")) user.admin = false;

    if (!req.user || !req.user.admin) {
      user.admin = false;
    }

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

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retrieve a list of users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     example: 1
   *                   name:
   *                     type: string
   *                     example: John Doe
   *                   email:
   *                     type: string
   *                     example: johndoe@example.com
   *                   admin:
   *                     type: boolean
   *                     example: false
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Soft delete a user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The user ID
   *     responses:
   *       204:
   *         description: User deleted successfully
   *       400:
   *         description: Validation error
   *       404:
   *         description: User not found
   */
  const remove = async (req, res) => {
    try {
      const articles = await app
        .db("articles")
        .where({ userId: req.params.id });
      notExistsOrError(articles, "User has articles");

      const rowsUpdated = app
        .db("users")
        .update({ deletedAt: new Date() })
        .where({ id: req.params.id });

      existsOrError(rowsUpdated, "User not found");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The user ID
   *     responses:
   *       200:
   *         description: User data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 1
   *                 name:
   *                   type: string
   *                   example: John Doe
   *                 email:
   *                   type: string
   *                   example: johndoe@example.com
   *                 admin:
   *                   type: boolean
   *                   example: false
   *       404:
   *         description: User not found
   */
  const getById = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .where({ id: req.params.id })
      .whereNull("deletedAt")
      .first()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  return { save, get, getById, remove };
};
