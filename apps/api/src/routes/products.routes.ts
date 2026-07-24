import { Router } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { listProducts, getProduct, getRecommendations, listCategories } from "../controllers/products.controller";

const router = Router();

router.get("/categories", asyncHandler(listCategories));
router.get("/", asyncHandler(listProducts));
router.get("/:id", asyncHandler(getProduct));
router.get("/:id/recommendations", asyncHandler(getRecommendations));

export default router;
