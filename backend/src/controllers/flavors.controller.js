import FlavorsService from "../services/flavors.service.js";
import { HTTP_CREATED, HTTP_SUCCESS } from "../utils/constants.util.js";

const flavorsService = new FlavorsService();

class FlavorsController {
  static getAllFlavors = async (req, res, next) => {
    try {
      const flavors = await flavorsService.getAll();
      res.status(HTTP_SUCCESS).send(flavors);
    } catch (error) {
      next(error);
    }
  };

  static getFlavorsById = async (req, res, next) => {
    const { fid } = req.params;
    try {
      const flavor = await flavorsService.getById(fid);
      res.status(HTTP_SUCCESS).send(flavor);
    } catch (error) {
      next(error);
    }
  };

  static addFlavor = async (req, res, next) => {
    const payload = req.body;
    try {
      const flavors = await flavorsService.addOne(payload);
      res.status(HTTP_CREATED).send(flavors);
    } catch (error) {
      next(error);
    }
  };

  static updateFlavor = async (req, res, next) => {
    const payload = req.body;
    const { fid } = req.params;
    try {
      const flavors = await flavorsService.updateOne(fid, payload);
      res.status(HTTP_SUCCESS).send(flavors);
    } catch (error) {
      next(error);
    }
  };

  static deleteFlavor = async (req, res, next) => {
    const { fid } = req.params;
    try {
      const flavors = await flavorsService.deleteOne(fid);
      res.status(HTTP_SUCCESS).send(flavors);
    } catch (error) {
      next(error);
    }
  };
}

export default FlavorsController;
