import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    registration_code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
}, {
    tableName: 'students', 
    timestamps: true,
});
export default Student;