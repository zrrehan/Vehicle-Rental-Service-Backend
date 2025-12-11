import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/",auth(["admin", "customer"]), bookingController.giveBooking);
router.get("/", auth(["admin", "customer"]), bookingController.showBookings);
router.put("/:bookingId", auth(["admin", "customer"]), bookingController.updateStatusByUsers);

export const bookingsRouter = router;