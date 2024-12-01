import { Router } from "express";

import { authorize, verifyToken } from "../middlewares/middleware";
import { getDocumentCounts } from "../controllers/analysisController";
const router = Router();

router.get("/", verifyToken, authorize(["admin"]), getDocumentCounts);
// router.get("/:id", verifyToken, authorize(["admin"]), getProduct);
// router.post("/", verifyToken, authorize(["admin"]), addProduct);
// router.put("/:id", verifyToken, authorize(["admin"]), updateProduct);
// router.delete("/:id", verifyToken, authorize(["admin"]), deleteProduct);

export default router;
