import { Router } from "express";
import {
  getProduct,
  getAllProducts,
  updateProduct,
  addProducts,
  deleteProduct,
} from "../controllers/productControllers";
const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", addProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
