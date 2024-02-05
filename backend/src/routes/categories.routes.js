import { Router } from "express";
import CategoriesController from "../controllers/categories.controller.js";

const router = Router();

router.get("/", CategoriesController.getAllCategories);

export default router;
