import RefrigeratorsService from "../services/refrigerators.service.js";
import { HTTP_CREATED, HTTP_SUCCESS } from "../utils/constants.util.js";

const refrigeratorsService = new RefrigeratorsService();

class RefrigeratorsController {
  static getAllRefrigerators = async (req, res, next) => {
    try {
      const refrigerators = await refrigeratorsService.getAll();
      res.status(HTTP_SUCCESS).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };

  static getRefrigeratorsById = async (req, res, next) => {
    const { rid } = req.params;
    try {
      const refrigerator = await refrigeratorsService.getById(rid);
      res.status(HTTP_SUCCESS).send(refrigerator);
    } catch (error) {
      next(error);
    }
  };

  static addRefrigerator = async (req, res, next) => {
    const payload = req.body;
    try {
      const refrigerators = await refrigeratorsService.addOne(payload);
      res.status(HTTP_CREATED).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };

  static updateRefrigerator = async (req, res, next) => {
    const payload = req.body;
    const { rid } = req.params;
    try {
      const refrigerators = await refrigeratorsService.updateMany(rid, payload);
      res.status(HTTP_SUCCESS).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };

  static deleteRefrigerator = async (req, res, next) => {
    const { rid } = req.params;
    try {
      const refrigerators = await refrigeratorsService.deleteOne(rid);
      res.status(HTTP_SUCCESS).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };
}

export default RefrigeratorsController;
