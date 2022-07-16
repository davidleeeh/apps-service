import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
    return sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export default UserModel;
