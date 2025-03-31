module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   name: Stats
   *   description: Operations related to statistics
   */

  const Stat = app.mongoose.model("Stat", {
    users: Number,
    categories: Number,
    articles: Number,
    createdAt: Date,
  });

  /**
   * @swagger
   * /stats:
   *   get:
   *     summary: Get statistics (users, categories, articles)
   *     tags: [Stats]
   *     responses:
   *       200:
   *         description: Statistics data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 users:
   *                   type: integer
   *                   example: 1000
   *                 categories:
   *                   type: integer
   *                   example: 50
   *                 articles:
   *                   type: integer
   *                   example: 150
   *       500:
   *         description: Internal server error
   */

  const get = (req, res) => {
    Stat.findOne(
      {},
      { _id: 0, users: 1, categories: 1, articles: 1 },
      { sort: { createdAt: -1 } }
    ).then((stat) => {
      const defaultStat = {
        users: 0,
        categories: 0,
        articles: 0,
      };
      res.json(stat || defaultStat);
    });
  };

  return {
    Stat,
    get,
  };
};
