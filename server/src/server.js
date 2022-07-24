import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import appsRoutes from "./routes/apps.js";
import authRoutes from "./routes/auth.js";

import corsOptions from "./config/cors.config.js";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/apps", appsRoutes);

if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
