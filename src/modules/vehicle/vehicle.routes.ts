import { Router } from "express";
import { auth } from "../../middleware/auth";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", auth(["admin"]), vehicleController.addVehicle)

export const vehicleRouter = router;