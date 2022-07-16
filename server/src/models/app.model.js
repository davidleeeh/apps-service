import { DataTypes } from "sequelize";

const AppModel = (sequelize) => {
    return sequelize.define("apps", {
        appname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        info: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    });
};

export default AppModel;
