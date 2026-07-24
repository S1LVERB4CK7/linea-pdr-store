import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../lib/asyncHandler";
import { getCart, addCartItem, updateCartItem, removeCartItem, clearCart } from "../controllers/cart.controller";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(getCart));
router.post("/", asyncHandler(addCartItem));
router.patch("/:productId", asyncHandler(updateCartItem));
router.delete("/:productId", asyncHandler(removeCartItem));
router.delete("/", asyncHandler(clearCart));

export default router;
