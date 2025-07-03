import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Discipline = sequelize.define('Discipline', {
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'disciplines',
    timestamps: true,
});
export default Discipline;