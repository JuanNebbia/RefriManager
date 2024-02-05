import { Router } from "express";
import flavorsRoutes from "./flavors.routes.js";
import categoriesRoutes from "./categories.routes.js";
import bucketsRoutes from "./buckets.routes.js";
import refrigeratorssRoutes from "./refrigerators.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const router = Router();

router.use("/flavors", flavorsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/buckets", bucketsRoutes);
router.use("/refrigerators", refrigeratorssRoutes);

router.use(errorMiddleware);

export default router;
