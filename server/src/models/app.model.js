import { DataTypes } from "sequelize";

const AppModel = (sequelize) => {
    return sequelize.define("apps", {
        appname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};

export default AppModel;
