import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.addColumn('exams', 'teacherId', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teachers',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  await queryInterface.addColumn('exams', 'classId', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'classes',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('exams', 'teacherId');
  await queryInterface.removeColumn('exams', 'classId');
}
