import express from "express";

import SignUpController from "../controllers/singUpController.js";
import SignInController from "../controllers/signInController.js";
import AuthCheckController from "../controllers/authCheckController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/signup", SignUpController);
router.post("/signin", SignInController);

router.use("/", jwtAuth);
router.get("/", AuthCheckController);

export default router;
