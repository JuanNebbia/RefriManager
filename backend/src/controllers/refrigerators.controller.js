import BucketsService from "../services/buckets.service.js";
import RefrigeratorsService from "../services/refrigerators.service.js";
import { HTTP_CREATED, HTTP_SUCCESS } from "../utils/constants.util.js";

const refrigeratorsService = new RefrigeratorsService();
const bucketsService = new BucketsService();

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
      const newRefrigerator = await refrigeratorsService.addOne(payload);
      for (let i = 0; i < payload.total_capacity; i++) {
        const newBucket = {
          refrigerator_id: newRefrigerator._id,
          flavor_id: null,
          position:
            i + 1 <= newRefrigerator.total_capacity / 2
              ? i + 1
              : i + 1 - newRefrigerator.total_capacity / 2,
          side: i + 1 <= newRefrigerator.total_capacity / 2 ? 0 : 1,
        };
        await bucketsService.addOne(newBucket);
      }
      const refrigerators = await refrigeratorsService.getAll();
      res.status(HTTP_CREATED).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };

  static updateRefrigerator = async (req, res, next) => {
    const payload = req.body;
    const { rid } = req.params;
    try {
      const refrigerators = await refrigeratorsService.updateOne(rid, payload);
      res.status(HTTP_SUCCESS).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };

  static deleteRefrigerator = async (req, res, next) => {
    const { rid } = req.params;
    try {
      await refrigeratorsService.deleteOne(rid);
      const buckets = await bucketsService.getAll();
      const refriBuckets = buckets.filter(
        (bucket) =>
          JSON.stringify(bucket.refrigerator_id) === JSON.stringify(rid)
      );
      refriBuckets.forEach(async (bucket) => {
        await bucketsService.deleteOne(bucket._id);
      });
      const refrigerators = await refrigeratorsService.getAll();
      res.status(HTTP_CREATED).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };
}

export default RefrigeratorsController;
