import { Router } from "express";
import flavorsRoutes from "./flavors.routes.js";
import categoriesRoutes from "./categories.routes.js";
import bucketsRoutes from "./buckets.routes.js";
import refrigeratorsRoutes from "./refrigerators.routes.js";
import ordersRoutes from "./orders.routes.js";
import authRoutes from "./auth.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const router = Router();

router.use("/buckets", bucketsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/flavors", flavorsRoutes);
router.use("/refrigerators", refrigeratorsRoutes);
router.use("/orders", ordersRoutes);
router.use("/auth", authRoutes);

router.use(errorMiddleware);

export default router;
