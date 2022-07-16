import express from "express";

import jwtAuth from "../middlewares/jwtAuth.js";
import queryTargetApp from "../middlewares/queryTargetApp.js";

import FetchAppsController from "../controllers/fetchAppsController.js";
import CreateAppController from "../controllers/createAppController.js";
import FetchAppController from "../controllers/fetchAppController.js";
import UpdateAppController from "../controllers/UpdateAppController.js";

const router = express.Router();

router.use(jwtAuth);
router.get("/", FetchAppsController);
router.post("/", CreateAppController);

router.use("/:appId", queryTargetApp);
router.get("/:appId", FetchAppController);
router.put("/:appId", UpdateAppController);

export default router;
