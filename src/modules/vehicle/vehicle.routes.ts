import { Router } from "express";
import { auth } from "../../middleware/auth";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", vehicleController.addVehicle)

export const vehicleRouter = router;