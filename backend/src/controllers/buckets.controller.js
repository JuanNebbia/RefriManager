import BucketsService from "../services/buckets.service.js";

const bucketsService = new BucketsService();

class BucketsController {
  static getAllBuckets = async (req, res, next) => {
    try {
      const buckets = await bucketsService.getAll();
      res.status(200).send(buckets);
    } catch (error) {
      next(error);
    }
  };

  static getBucketsById = async (req, res, next) => {
    const { bid } = req.params;
    try {
      const bucket = await bucketsService.getById(bid);
      res.status(200).send(bucket);
    } catch (error) {
      next(error);
    }
  };

  static addBucket = async (req, res, next) => {
    const payload = req.body;
    try {
      const buckets = await bucketsService.addOne(payload);
      res.status(201).send(buckets);
    } catch (error) {
      next(error);
    }
  };

  static updateBucket = async (req, res, next) => {
    const payload = req.body;
    const { bid } = req.params;
    try {
      const buckets = await bucketsService.updateOne(bid, payload);
      res.status(200).send(buckets);
    } catch (error) {
      next(error);
    }
  };

  static deleteBucket = async (req, res, next) => {
    const { bid } = req.params;
    try {
      const buckets = await bucketsService.deleteOne(bid);
      res.status(200).send(buckets);
    } catch (error) {
      next(error);
    }
  };
}

export default BucketsController;
