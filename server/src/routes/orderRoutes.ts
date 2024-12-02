import { Router } from "express";

import { authorize, verifyToken } from "../middlewares/middleware";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  userOrders,
} from "../controllers/orderControllers";
const router = Router();

router.get("/", verifyToken, authorize(["admin"]), getAllOrders);
router.post("/", verifyToken, authorize(["admin", "user"]), createOrder);
router.put("/:id", verifyToken, authorize(["admin"]), updateOrder);
router.get(
  "/user/:userId",
  verifyToken,
  authorize(["admin", "user"]),
  userOrders
);

export default router;
