import { Router } from "express";
import BucketsController from "../controllers/buckets.controller.js";

const router = Router();

router.get("/", BucketsController.getAllBuckets);
router.get("/:bid", BucketsController.getBucketsById);
router.post("/", BucketsController.addBucket);
router.put("/:bid", BucketsController.updateBucket);
router.delete("/:bid", BucketsController.deleteBucket);

export default router;
