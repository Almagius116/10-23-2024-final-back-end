'use strict';
const {
  Model 
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auths extends Model {
     /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auths.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    }
  }

  Auths.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isSameAsPassword(value) {
          if (value !== this.password) {
            throw new Error('Passwords must match');
          }
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Auths',
  });

  return Auths;
};
