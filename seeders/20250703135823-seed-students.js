export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('students', [
    {
      name: 'João Santos',
      email: 'joao.santos@example.com',
      cpf: '123.456.789-00',
      registration_code: 'REG001',
      classId: 26, // 6AM
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      cpf: '234.567.890-11',
      registration_code: 'REG002',
      classId: 27, // 6BM
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Carlos Lima',
      email: 'carlos.lima@example.com',
      cpf: '345.678.901-22',
      registration_code: 'REG003',
      classId: 28, // 7AT
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fernanda Costa',
      email: 'fernanda.costa@example.com',
      cpf: '456.789.012-33',
      registration_code: 'REG004',
      classId: 29, // 8BV
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rafael Souza',
      email: 'rafael.souza@example.com',
      cpf: '567.890.123-44',
      registration_code: 'REG005',
      classId: 30, // 9CM
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete('students', null, {});
}
