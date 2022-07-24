import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
    return sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export default UserModel;
