import categoriesJson from "../mock/categories.mock.json" with {type: "json"};

class CategoriesController {
  static getAllCategories = async (req, res, next) => {
    const categories = categoriesJson;
    try {
      res.status(200).send(categories);
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
