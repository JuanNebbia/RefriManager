import BucketsService from "../services/buckets.service.js";
import { HTTP_CREATED, HTTP_SUCCESS } from "../utils/constants.util.js";

const bucketsService = new BucketsService();

class BucketsController {
  static getAllBuckets = async (req, res, next) => {
    try {
      const buckets = await bucketsService.getAll();
      res.status(HTTP_SUCCESS).send(buckets);
    } catch (error) {
      next(error);
    }
  };

  static getBucketsById = async (req, res, next) => {
    const { bid } = req.params;
    try {
      const bucket = await bucketsService.getById(bid);
      res.status(HTTP_SUCCESS).send(bucket);
    } catch (error) {
      next(error);
    }
  };

  static addBucket = async (req, res, next) => {
    const payload = req.body;
    try {
      const buckets = await bucketsService.addOne(payload);
      res.status(HTTP_CREATED).send(buckets);
    } catch (error) {
      next(error);
    }
  };

  static updateBucket = async (req, res, next) => {
    const payload = req.body;
    const { bid } = req.params;
    try {
      const buckets = await bucketsService.updateOne(bid, payload);
      res.status(HTTP_SUCCESS).send(buckets);
    } catch (error) {
      next(error);
    }
  };

  static deleteBucket = async (req, res, next) => {
    const { bid } = req.params;
    try {
      const buckets = await bucketsService.deleteOne(bid);
      res.status(HTTP_SUCCESS).send(buckets);
    } catch (error) {
      next(error);
    }
  };
}

export default BucketsController;
