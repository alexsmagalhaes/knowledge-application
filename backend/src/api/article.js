const queries = require("./queries");

module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.src.api.validation;

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

  return { save, remove, get, getById,getByCategory };
};
