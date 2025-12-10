import { Router } from "express";
import { userController } from "./users.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/", auth(["admin"]), userController.getAllUser);
router.delete("/:userId", auth(["admin"]), userController.deleteUser);

export const userRouter = router;