import CategoriesService from "../services/categories.service.js";
import { HTTP_CREATED, HTTP_SUCCESS } from "../utils/constants.util.js";

const categoriesService = new CategoriesService();

class CategoriesController {
  static getAllCategories = async (req, res, next) => {
    try {
      const categories = await categoriesService.getAll();
      res.status(HTTP_SUCCESS).send(categories);
    } catch (error) {
      next(error);
    }
  };

  static getCategoriesById = async (req, res, next) => {
    const { cid } = req.params;
    try {
      const category = await categoriesService.getById(cid);
      res.status(HTTP_SUCCESS).send(category);
    } catch (error) {
      next(error);
    }
  };

  static addCategory = async (req, res, next) => {
    const payload = req.body;
    try {
      const categories = await categoriesService.addOne(payload);
      res.status(HTTP_CREATED).send(categories);
    } catch (error) {
      next(error);
    }
  };

  static updateCategory = async (req, res, next) => {
    const payload = req.body;
    const { cid } = req.params;
    try {
      const categories = await categoriesService.updateOne(cid, payload);
      res.status(HTTP_SUCCESS).send(categories);
    } catch (error) {
      next(error);
    }
  };

  static deleteCategory = async (req, res, next) => {
    const { cid } = req.params;
    try {
      const categories = await categoriesService.deleteOne(cid);
      res.status(HTTP_SUCCESS).send(categories);
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
