import { Router } from "express";
import userRoutes from "./userRoutes";
import albumRoutes from "./albumRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/albums", albumRoutes);

export default router;
