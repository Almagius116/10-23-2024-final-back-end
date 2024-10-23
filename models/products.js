"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Shops, {
        foreignKey: "shopId",
        as: "shop",
      });
    }
  }
  Products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product name is required",
          },
        },
      },
      images: DataTypes.ARRAY(DataTypes.TEXT),
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Minimal stock must be 0",
          },
          max: {
            args: 1000000,
            msg: "Maximal stock must be 1000000",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 5000,
            msg: "Minimal price must be 5000 IDR",
          },
        },
      },
      shopId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Shops",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
