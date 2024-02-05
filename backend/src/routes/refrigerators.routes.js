import { Router } from "express";
import RefrigeratorsController from "../controllers/refrigerators.controller.js";

const router = Router();

router.get("/", RefrigeratorsController.getAllRefrigerators);

export default router;
