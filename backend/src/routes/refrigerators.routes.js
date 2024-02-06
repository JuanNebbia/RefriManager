import { Router } from "express";
import RefrigeratorsController from "../controllers/refrigerators.controller.js";

const router = Router();

router.get("/", RefrigeratorsController.getAllRefrigerators);
router.get("/:rid", RefrigeratorsController.getRefrigeratorsById);
router.post("/", RefrigeratorsController.addRefrigerator);
router.put("/:rid", RefrigeratorsController.updateRefrigerator);
router.delete("/:rid", RefrigeratorsController.deleteRefrigerator);

export default router;
