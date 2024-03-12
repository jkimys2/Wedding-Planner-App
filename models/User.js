// import dependencies/files
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// check password to make sure it matches the
class User extends Model {
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

User.init(
  // defines columns and types
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      //   length: [8], 
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      len: [8,16],   // only allow values with length between 8 and 16
      },
    },
  },
  // optional settings link to the database connection
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// export User model
module.exports = User;
