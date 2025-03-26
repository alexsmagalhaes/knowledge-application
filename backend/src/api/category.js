module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.src.api.validation;

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

  const get = (req, res) => {
    app
      .db("categories")
      .then((categories) => res.json(withPath(categories)))
      .catch((err) => res.status(500).send(err));
  };

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
