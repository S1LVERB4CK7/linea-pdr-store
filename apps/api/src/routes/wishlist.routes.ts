import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../lib/asyncHandler";
import { getWishlist, addWishlistItem, removeWishlistItem } from "../controllers/wishlist.controller";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(getWishlist));
router.post("/", asyncHandler(addWishlistItem));
router.delete("/:productId", asyncHandler(removeWishlistItem));

export default router;
