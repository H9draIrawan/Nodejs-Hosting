const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("playgo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

class User extends Model {}
User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, timestamps: false }
);

module.exports = { sequelize, User };
