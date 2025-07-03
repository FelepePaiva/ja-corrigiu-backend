export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('teachers', [
    {
      name: 'Ana Silva',
      email: 'ana.silva@example.com',
      cpf: '123.456.789-00',
      password: 'senha123', // Lembre-se de criptografar na aplicação real!
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Bruno Costa',
      email: 'bruno.costa@example.com',
      cpf: '234.567.890-11',
      password: 'senha123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Carla Pereira',
      email: 'carla.pereira@example.com',
      cpf: '345.678.901-22',
      password: 'senha123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Daniel Oliveira',
      email: 'daniel.oliveira@example.com',
      cpf: '456.789.012-33',
      password: 'senha123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Elisa Martins',
      email: 'elisa.martins@example.com',
      cpf: '567.890.123-44',
      password: 'senha123',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('teachers', null, {});
}
