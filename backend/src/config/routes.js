module.exports = (app) => {
  const protectedRoute = app.src.config.passport.authenticate();

  const userSignUp = app.src.api.user.save;
  const userSignIn = app.src.api.auth.signin;
  const userValidate = app.src.api.auth.validateToken;

  app.post("/signup", userSignUp);
  app.post("/signin", userSignIn);
  app.post("/validateToken", userValidate);

  const usersSave = app.src.api.user.save;
  const usersGet = app.src.api.user.get;
  app.route("/users").all(protectedRoute).post(usersSave).get(usersGet);
  app.route("/users/:id").all(protectedRoute).put(usersSave);

  const categoriesSave = app.src.api.category.save;
  const categoriesGetAll = app.src.api.category.get;
  app
    .route("/categories")
    .all(protectedRoute)
    .get(categoriesGetAll)
    .post(categoriesSave);

  const categoriesGetTree = app.src.api.category.getTree;
  app.route("/categories/tree").all(protectedRoute).get(categoriesGetTree);

  const categoriesGetById = app.src.api.category.getById;
  const categoriesDelete = app.src.api.category.remove;
  app
    .route("/categories/:id")
    .all(protectedRoute)
    .get(categoriesGetById)
    .put(categoriesSave)
    .delete(categoriesDelete);

  const articlesSave = app.src.api.article.save;
  const articlesGetAll = app.src.api.article.get;
  app
    .route("/articles")
    .all(protectedRoute)
    .post(articlesSave)
    .get(articlesGetAll);

  const articlesRemove = app.src.api.article.remove;
  const articlesById = app.src.api.article.getById;
  app
    .route("/articles/:id")
    .all(protectedRoute)
    .delete(articlesRemove)
    .get(articlesById);

  const articlesGetByCategory = app.src.api.article.getById;
  app
    .route("/categories/:id/articles")
    .all(protectedRoute)
    .get(articlesGetByCategory);

  const getStats = app.src.api.stat.get;
  app.route("/stats").all(protectedRoute).get(getStats);
};
