module.exports = (app) => {
  const userSignUp = app.src.api.user.save;
  const userSignIn = app.src.api.auth.signin;
  const userValidate = app.src.api.auth.validateToken;

  app.post("/signup", userSignUp);
  app.post("/signin", userSignIn);
  app.post("/validateToken", userValidate);

  const usersSave = app.src.api.user.save;
  const usersGet = app.src.api.user.get;
  app.route("/users").post(usersSave).get(usersGet);
  app.route("/users/:id").put(usersSave);

  const categoriesSave = app.src.api.category.save;
  const categoriesGetAll = app.src.api.category.get;
  app.route("/categories").get(categoriesGetAll).post(categoriesSave);

  const categoriesGetTree = app.src.api.category.getTree;
  app.route("/categories/tree").get(categoriesGetTree);

  const categoriesGetById = app.src.api.category.getById;
  const categoriesDelete = app.src.api.category.remove;
  app
    .route("/categories/:id")
    .get(categoriesGetById)
    .put(categoriesSave)
    .delete(categoriesDelete);

  const articlesSave = app.src.api.article.save;
  const articlesGetAll = app.src.api.article.get;
  app.route("/articles").post(articlesSave);
  app.route("/articles").get(articlesGetAll);

  const articlesRemove = app.src.api.article.remove;
  const articlesById = app.src.api.article.getById;
  app.route("/articles/:id").delete(articlesRemove);
  app.route("/articles/:id").get(articlesById);

  const articlesGetByCategory = app.src.api.article.getById;
  app.route("/categories/:id/articles").get(articlesGetByCategory);
};
