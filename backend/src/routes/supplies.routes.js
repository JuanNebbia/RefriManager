import { Router } from "express";
import SuppliesController from "../controllers/supplies.controller.js";

const router = Router();

router.get("/", SuppliesController.getAllSupplies);
router.get("/:sid", SuppliesController.getSuppliesById);
router.post("/", SuppliesController.addOrder);
router.delete("/:sid", SuppliesController.deleteSupply);

export default router;
