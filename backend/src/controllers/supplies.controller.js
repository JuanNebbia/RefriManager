import SuppliesService from "../services/supplies.service.js";
import { HTTP_CREATED, HTTP_SUCCESS } from "../utils/constants.util.js";

const suppliesService = new SuppliesService();

class SuppliesController {
  static getAllSupplies = async (req, res, next) => {
    try {
      const supplies = await suppliesService.getAll();
      res.status(HTTP_SUCCESS).send(supplies);
    } catch (error) {
      next(error);
    }
  };

  static getSuppliesById = async (req, res, next) => {
    const { sid } = req.params;
    try {
      const supply = await suppliesService.getById(sid);
      res.status(HTTP_SUCCESS).send(supply);
    } catch (error) {
      next(error);
    }
  };

  static addOrder = async (req, res, next) => {
    const payload = req.body;
    try {
      const supply = await suppliesService.addOne(payload);
      res.status(HTTP_CREATED).send(supply);
    } catch (error) {
      next(error);
    }
  };

  static deleteSupply = async (req, res, next) => {
    const { sid } = req.params;
    try {
      const supplies = await suppliesService.deleteOne(sid);
      res.status(HTTP_SUCCESS).send(supplies);
    } catch (error) {
      next(error);
    }
  };
}

export default SuppliesController;
