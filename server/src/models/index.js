import Sequelize from "sequelize";
import UserModel from "./user.model.js";
import AppModel from "./app.model.js";

import "dotenv/config";

const sequelize = new Sequelize(
    process.env.DB_SCHEMA || "appdb",
    process.env.DB_USER || "appuser",
    process.env.DB_PASSWORD || "appuser",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        operatorsAliases: false,
    }
);

const User = UserModel(sequelize),
    App = AppModel(sequelize);

App.belongsTo(User, {
    foreignKey: "ownerId",
});

export { sequelize, User, App };
