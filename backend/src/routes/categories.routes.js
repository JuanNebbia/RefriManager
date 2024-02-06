import { Router } from "express";
import CategoriesController from "../controllers/categories.controller.js";

const router = Router();

router.get("/", CategoriesController.getAllCategories);
router.get("/:cid", CategoriesController.getCategoriesById);
router.post("/", CategoriesController.addCategory);
router.put("/:cid", CategoriesController.updateCategory);
router.delete("/:cid", CategoriesController.deleteCategory);

export default router;
