import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('answers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    percentage: {
      type: DataTypes.FLOAT,
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
  await queryInterface.dropTable('answers');
}
