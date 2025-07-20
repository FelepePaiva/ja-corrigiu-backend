export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('exams', 'bimester', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1, // Altere se quiser começar com outro valor
    validate: {
      min: 1,
      max: 4,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('exams', 'bimester');
}
