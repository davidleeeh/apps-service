import express from "express";

import SignUpController from "../controllers/singUpController.js";
import SignInController from "../controllers/signInController.js";

const router = express.Router();

router.post("/signup", SignUpController);
router.post("/signin", SignInController);

export default router;
