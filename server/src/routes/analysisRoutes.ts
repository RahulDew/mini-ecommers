import { Router } from "express";

import { authorize, verifyToken } from "../middlewares/middleware";
import { getOverview } from "../controllers/analysisController";
const router = Router();

router.get("/", verifyToken, authorize(["admin"]), getOverview);
// router.get("/:id", verifyToken, authorize(["admin"]), getProduct);
// router.post("/", verifyToken, authorize(["admin"]), addProduct);
// router.put("/:id", verifyToken, authorize(["admin"]), updateProduct);
// router.delete("/:id", verifyToken, authorize(["admin"]), deleteProduct);

export default router;
