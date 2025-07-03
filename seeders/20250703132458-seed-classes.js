export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('classes', [
    {
      code: '6AM',
      year: 2024,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '6BM',
      year: 2024,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '7AT',
      year: 2024,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '8BV',
      year: 2024,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '9CM',
      year: 2024,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('classes', null, {});
}
