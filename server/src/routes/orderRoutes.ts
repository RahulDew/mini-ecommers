import { Router } from "express";

import { authorize, verifyToken } from "../middlewares/middleware";
import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  userOrders,
} from "../controllers/orderControllers";
const router = Router();

router.get("/", verifyToken, authorize(["admin"]), getAllOrders);
router.get("/:id", verifyToken, authorize(["admin", "user"]), getOrder);
router.post("/", verifyToken, authorize(["admin", "user"]), createOrder);
router.put("/:id", verifyToken, authorize(["admin"]), updateOrder);
router.put(
  "/user/:userid",
  verifyToken,
  authorize(["admin", "user"]),
  userOrders
);

export default router;
