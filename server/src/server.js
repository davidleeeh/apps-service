import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import appsRoutes from "./routes/apps.js";

import { corsOptions } from "./config/cors.config.js";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/apps", appsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
