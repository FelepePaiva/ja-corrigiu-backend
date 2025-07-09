import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('exams', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questions_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer_key: {
      type: DataTypes.JSON,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('exams');
}
