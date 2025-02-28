module.exports = app => {
  const save = app.src.api.user.save
  
  app.route("/user").post(save);
};
