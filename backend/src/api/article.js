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


  return { save };
};
