import { Router } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { listProducts, getProduct, getRecommendations } from "../controllers/products.controller";

const router = Router();

router.get("/", asyncHandler(listProducts));
router.get("/:id", asyncHandler(getProduct));
router.get("/:id/recommendations", asyncHandler(getRecommendations));

export default router;
