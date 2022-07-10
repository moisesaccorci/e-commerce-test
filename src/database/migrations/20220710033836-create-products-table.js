'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DataTypes.FLOAT
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      thumbnail_url: {
        type: Sequelize.DataTypes.STRING
      },
      featured: {
        defaultValue: false,
        type: Sequelize.DataTypes.BOOLEAN
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products')
  }
};