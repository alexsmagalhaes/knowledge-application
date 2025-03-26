module.exports = (app) => {
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
};
