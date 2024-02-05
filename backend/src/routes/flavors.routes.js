import { Router } from "express";
import FlavorsController from "../controllers/flavors.controller.js";

const router = Router();

router.get("/", FlavorsController.getAllFlavors);

export default router;
