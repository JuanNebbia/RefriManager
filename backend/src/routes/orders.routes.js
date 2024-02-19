import { Router } from "express";
import OrdersController from "../controllers/orders.controller.js";

const router = Router();

router.get("/", OrdersController.getAllOrders);
router.get("/:oid", OrdersController.getOrdersById);
router.post("/", OrdersController.addOrder);
router.put("/:oid", OrdersController.updateOrder);
router.delete("/:oid", OrdersController.deleteOrder);

export default router;
