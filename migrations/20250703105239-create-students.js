export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('students', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    registration_code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    classId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'classes', // nome da tabela referenciada
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
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

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('students');
}
