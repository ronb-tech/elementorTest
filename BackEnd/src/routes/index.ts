import { Router } from "express";
import userRoutes from "./userRoutes";
import albumRoutes from "./albumRoutes";
import photosRoutes from "./photoRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/albums", albumRoutes);
router.use("/photos", photosRoutes);

export default router;
