const queries = require("./queries");

module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.src.api.validation;

  /**
   * @swagger
   * tags:
   *   name: Articles
   *   description: Operations related to articles
   */

  /**
   * @swagger
   * /articles:
   *   post:
   *     summary: Create or update an article
   *     tags: [Articles]
   *     parameters:
   *       - in: body
   *         name: article
   *         description: Article data
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               example: "Article Title"
   *             description:
   *               type: string
   *               example: "Article description."
   *             content:
   *               type: string
   *               example: "This is the article content."
   *             categoryId:
   *               type: integer
   *               example: 1
   *             userId:
   *               type: integer
   *               example: 123
   *     responses:
   *       204:
   *         description: Article successfully created or updated
   *       400:
   *         description: Missing required fields
   *       500:
   *         description: Internal server error
   */

  const save = (req, res) => {
    const article = { ...req.body };
    if (req.params.id) article.id = req.params.id;

    try {
      existsOrError(article.name, "Name not provided");
      existsOrError(article.description, "Description not provided");
      existsOrError(article.categoryId, "Category not provided");
      existsOrError(article.userId, "Author not provided");
      existsOrError(article.content, "Content not provided");
    } catch (msg) {
      res.status(400).send(msg);
    }

    if (article.id) {
      app
        .db("articles")
        .update(article)
        .where({ id: article.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("articles")
        .insert(article)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  /**
   * @swagger
   * /articles/{id}:
   *   delete:
   *     summary: Delete an article
   *     tags: [Articles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Article ID
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       204:
   *         description: Article successfully deleted
   *       400:
   *         description: Article not found
   *       500:
   *         description: Internal server error
   */

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("articles")
        .where({ id: req.params.id })
        .del();

      try {
        notExistsOrError(rowsDeleted, "Article not found");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  /**
   * @swagger
   * /articles:
   *   get:
   *     summary: Get a list of articles
   *     tags: [Articles]
   *     parameters:
   *       - in: query
   *         name: page
   *         required: false
   *         description: Page number for pagination
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: List of articles
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       name:
   *                         type: string
   *                         example: "Article Title"
   *                       description:
   *                         type: string
   *                         example: "Article description."
   *                 count:
   *                   type: integer
   *                   example: 50
   *                 limit:
   *                   type: integer
   *                   example: 10
   *       500:
   *         description: Internal server error
   */

  const limit = 10;
  const get = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("articles").count("id").first();
    const count = parseInt(result.count);

    app
      .db("articles")
      .select("id", "name", "description")
      .limit(limit)
      .offset(page * limit - limit)
      .then((articles) => res.json({ data: articles, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  /**
   * @swagger
   * /articles/{id}:
   *   get:
   *     summary: Get an article by ID
   *     tags: [Articles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Article ID
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Article found
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
   *                   example: "Article Title"
   *                 description:
   *                   type: string
   *                   example: "Article description."
   *                 content:
   *                   type: string
   *                   example: "This is the article content."
   *       500:
   *         description: Internal server error
   */

  const getById = (req, res) => {
    app
      .db("articles")
      .where({ id: req.params.id })
      .first()
      .then((article) => {
        article.content = article.content.toString();
        return res.json(article);
      })
      .catch((err) => res.status(500).send(err));
  };

  /**
   * @swagger
   * /articles/category/{id}:
   *   get:
   *     summary: Get articles by category
   *     tags: [Articles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Category ID
   *         schema:
   *           type: integer
   *           example: 1
   *       - in: query
   *         name: page
   *         required: false
   *         description: Page number for pagination
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: List of articles in the category
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
   *                     example: "Article Title"
   *                   description:
   *                     type: string
   *                     example: "Article description."
   *                   imageUrl:
   *                     type: string
   *                     example: "https://example.com/image.jpg"
   *                   author:
   *                     type: string
   *                     example: "John Doe"
   *       500:
   *         description: Internal server error
   */

  const getByCategory = async (req, res) => {
    const categoryId = req.params.id;
    const page = req.query.page || 1;
    const categories = await app.db.raw(
      queries.categoryWithChildren,
      req.params.id
    );
    const ids = categories.rows.map((category) => category.id);

    app
      .db({ a: "articles", u: "users" })
      .select("a.id", "a.nome", "a.description", "a.imageUrl", {
        author: "a.name",
      })
      .limit(limit)
      .offset(page * limit - limit)
      .whereRaw("?? = ??", ["u.id", "a.userId"])
      .whereIn("categoryId", ids)
      .orderBy("a.id", "desc")
      .then((articles) => {
        res.json(articles);
      })
      .catch((msg) => res.status(500).send(msg));
  };

  return { save, remove, get, getById, getByCategory };
};
