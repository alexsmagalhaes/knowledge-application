module.exports = (app) => {
  const save = app.src.api.user.save;
  const get = app.src.api.user.get;

  app.route("/users").post(save).get(get);
  app.route("/users/:id").put(save);
};
