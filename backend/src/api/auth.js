const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: User auth operations
   */

   /**
   * @swagger
   * /signup:
   *   post:
   *     summary: Create a new user
   *     tags: [Authentication]
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
   * /signin:
   *   post:
   *     summary: Sign in with email and password
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: johndoe@example.com
   *               password:
   *                 type: string
   *                 example: password123
   *     responses:
   *       200:
   *         description: Successfully signed in and returns the JWT token
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
   *                 iat:
   *                   type: integer
   *                   example: 1617172800
   *                 exp:
   *                   type: integer
   *                   example: 1617259200
   *                 token:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       400:
   *         description: Email or password not provided or user not found
   *       401:
   *         description: Invalid email or password
   */
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password)
      return res.status(400).send("Email or password not provided");

    const user = await app.db("users").where({ email: req.body.email }).first();

    if (!user) return res.status(400).send("User not found");

    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) return res.status(401).send("Email or password is incorrect");

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      iat: now,
      exp: now + 60 * 60 * 24 * 3,
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, process.env.JWT_SECRET),
    });
  };

  /**
   * @swagger
   * /validateToken:
   *   post:
   *     summary: Validate the JWT token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *     responses:
   *       200:
   *         description: Returns true if the token is valid
   *         content:
   *           application/json:
   *             schema:
   *               type: boolean
   *               example: true
   *       400:
   *         description: Invalid or missing token
   *       401:
   *         description: Token has expired or is invalid
   */
  const validateToken = async (req, res) => {
    const userData = req.body || null;

    try {
      if (userData) {
        const token = jwt.decode(userData.token, process.env.JWT_SECRET);

        if (new Date(token.exp * 1000) > new Date()) return res.send(true);
      }
    } catch (msg) {}

    res.send(false);
  };

  return {
    signin,
    validateToken,
  };
};
