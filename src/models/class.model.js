import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Class = sequelize.define('Class', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'classes',
    timestamps: true,
});
export default Class;