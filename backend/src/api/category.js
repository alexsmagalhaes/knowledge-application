module.exports = (app) => {
  /**
   * @swagger
   * tags:
   *   name: Categories
   *   description: Category operations
   */

  const { existsOrError, notExistsOrError } = app.src.api.validation;

  /**
   * @swagger
   * /categories:
   *   post:
   *     summary: Create or update a category
   *     tags: [Categories]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: Technology
   *               parentId:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       204:
   *         description: Category created/updated successfully
   *       400:
   *         description: Validation error
   *       500:
   *         description: Internal server error
   */

  const save = (req, res) => {
    const category = { ...req.body };

    if (req.params.id) category.id = req.params.id;

    try {
      existsOrError(category.name, "Name is empty");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (category.id) {
      app
        .db("categories")
        .update(category)
        .where({ id: category.id })
        .then((_) => res.status(204).send())
        .catch((msg) => res.status(500).send(msg));
    } else {
      app
        .db("categories")
        .insert(category)
        .then((_) => {
          res.status(204).send();
        })
        .catch((msg) => {
          res.status(500).send(msg);
        });
    }
  };

  /**
   * @swagger
   * /categories/{id}:
   *   delete:
   *     summary: Soft delete a category
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The category ID
   *     responses:
   *       204:
   *         description: Category deleted successfully
   *       400:
   *         description: Validation error
   *       404:
   *         description: Category not found or has dependencies
   */

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Category Code not provided");

      const subcategory = await app
        .db("categories")
        .where({ parentId: req.params.id });
      notExistsOrError(subcategory, "Category has subcategories");

      const articles = await app
        .db("articles")
        .where({ categoryId: req.params.id });
      notExistsOrError(articles, "Category has articles");

      const rowsDeleted = await app
        .db("categories")
        .where({ id: req.params.id })
        .del();
      existsOrError(rowsDeleted, "Category not found");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const withPath = (categories) => {
    const categoryMap = {};
    const categoriesWithPath = [];

    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, path: category.name };
    });

    const buildPath = (category) => {
      let path = category.name;
      let currentCategory = categoryMap[category.parentId];
      const visited = new Set();

      while (currentCategory) {
        if (visited.has(currentCategory.id)) {
          break;
        }
        visited.add(currentCategory.id);
        path = `${currentCategory.name} > ${path}`;
        currentCategory = categoryMap[currentCategory.parentId];
      }

      return path;
    };

    categories.forEach((category) => {
      category.path = buildPath(category);
      categoriesWithPath.push(category);
    });

    categoriesWithPath.sort((a, b) => a.path.localeCompare(b.path));

    return categoriesWithPath;
  };

  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: Retrieve all categories
   *     tags: [Categories]
   *     responses:
   *       200:
   *         description: A list of categories with paths
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
   *                     example: Technology
   *                   path:
   *                     type: string
   *                     example: Root > Technology
   */

  const get = (req, res) => {
    app
      .db("categories")
      .then((categories) => res.json(withPath(categories)))
      .catch((err) => res.status(500).send(err));
  };

  /**
   * @swagger
   * /categories/{id}:
   *   get:
   *     summary: Get a category by ID
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The category ID
   *     responses:
   *       200:
   *         description: Category data
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
   *                   example: Technology
   *       404:
   *         description: Category not found
   */

  const getById = (req, res) => {
    try {
      app
        .db("categories")
        .where({ id: req.params.id })
        .first()
        .then((category) => {
          existsOrError(category, "Category does not exist");
          return res.json(category);
        })
        .catch((msg) => {
          res.status(404).send(msg);
        });
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const toTree = (categories, tree) => {
    if (!tree) tree = categories.filter((c) => !c.parentId);
    tree = tree.map((parentNode) => {
      const isChild = (node) => node.parentId == parentNode.id;
      parentNode.children = toTree(categories, categories.filter(isChild));
      return parentNode;
    });
    return tree;
  };

  /**
   * @swagger
   * /categories/tree:
   *   get:
   *     summary: Get categories as a tree structure
   *     tags: [Categories]
   *     responses:
   *       200:
   *         description: Categories in a tree structure
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
   *                     example: Technology
   *                   children:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: integer
   *                           example: 2
   *                         name:
   *                           type: string
   *                           example: Computers
   */

  const getTree = (req, res) => {
    app
      .db("categories")
      .then((categories) => res.json(toTree(categories)))
      .catch((err) => res.status(500).send(err));
  };

  return {
    save,
    remove,
    get,
    getById,
    getTree,
  };
};
