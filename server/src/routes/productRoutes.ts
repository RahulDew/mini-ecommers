import { Router } from "express";
import {
  getProduct,
  getAllProducts,
  updateProduct,
  addProduct,
  deleteProduct,
} from "../controllers/productControllers";
import { authorize, verifyToken } from "../middlewares/middleware";
const router = Router();

router.get("/", getAllProducts);
// router.get("/", verifyToken, authorize(["user", "admin"]), getAllProducts);
router.get("/:id", verifyToken, authorize(["user", "admin"]), getProduct);
router.post("/", verifyToken, authorize(["admin"]), addProduct);
router.put("/:id", verifyToken, authorize(["admin"]), updateProduct);
router.delete("/:id", verifyToken, authorize(["admin"]), deleteProduct);

export default router;
