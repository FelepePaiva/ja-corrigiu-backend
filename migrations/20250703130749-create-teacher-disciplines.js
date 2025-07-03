export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('teacher_disciplines', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    teacherId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'teachers',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    disciplineId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'disciplines',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('teacher_disciplines');
}
