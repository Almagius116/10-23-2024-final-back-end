"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: [
          "https://ik.imagekit.io/imamth/Profile-17-1729202156932_ieaMdNeZB.png?updatedAt=1729202158471",
        ],
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          max: 10000,
        },
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 5000,
        validate: {
          min: 5000,
        },
      },
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Shops",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
