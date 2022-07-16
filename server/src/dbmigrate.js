import { sequelize } from "./models/index.js";
(async () => {
    await sequelize.sync({ force: true });
})();
