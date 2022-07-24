import Sequelize from "sequelize";
import AppModel from "./app.model.js";
import UserModel from "./user.model.js";
import "dotenv/config";
import dbConfig from "../config/db.config.js";

const sequelize = new Sequelize(
    process.env.DB_SCHEMA || dbConfig.schema,
    process.env.DB_USER || dbConfig.user,
    process.env.DB_PASSWORD || dbConfig.password,
    {
        host: process.env.DB_HOST || dbConfig.host,
        port: process.env.DB_PORT || dbConfig.port,
        dialect: "postgres",
        logging: true,
    }
);

const User = UserModel(sequelize),
    App = AppModel(sequelize);

App.belongsTo(User, {
    foreignKey: "ownerId",
});

export { sequelize, User, App };
