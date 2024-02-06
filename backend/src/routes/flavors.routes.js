import { Router } from "express";
import FlavorsController from "../controllers/flavors.controller.js";

const router = Router();

router.get("/", FlavorsController.getAllFlavors);
router.get("/:fid", FlavorsController.getFlavorsById);
router.post("/", FlavorsController.addFlavor);
router.put("/:fid", FlavorsController.updateFlavor);
router.delete("/:fid", FlavorsController.deleteFlavor);

export default router;
