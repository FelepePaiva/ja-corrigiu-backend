export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('disciplines', [
    {
      name: 'Matemática',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Português',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'História',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Geografia',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ciências',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('disciplines', null, {});
}
