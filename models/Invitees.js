// import dependencies/files
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Invitees extends Model {}

// set up table
Invitees.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    plus_one: {
      type: DataTypes.BOOLEAN,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
    },
    food_choice: {
      type: DataTypes.ENUM({ values: ["Steak", "Chicken", "Vegetarian"] }),
      allowNull: false,
    },
    wedding_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "wedding",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "invitees",
  }
);

// export module
module.exports = Invitees;
