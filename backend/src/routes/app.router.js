import { Router } from "express";
import flavorsRoutes from "./flavors.routes.js";
import categoriesRoutes from "./categories.routes.js";
import bucketsRoutes from "./buckets.routes.js";
import refrigeratorsRoutes from "./refrigerators.routes.js";
import ordersRoutes from "./orders.routes.js";
import supplyRoutes from "./supplies.routes.js";
import authRoutes from "./auth.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import verifyToken from "../middlewares/session.middleware.js";

const router = Router();

router.use("/buckets", verifyToken, bucketsRoutes);
router.use("/categories", verifyToken, categoriesRoutes);
router.use("/flavors", verifyToken, flavorsRoutes);
router.use("/refrigerators", verifyToken, refrigeratorsRoutes);
router.use("/orders", verifyToken, ordersRoutes);
router.use("/supplies", verifyToken, supplyRoutes);
router.use("/auth", authRoutes);

router.use(errorMiddleware);

export default router;
