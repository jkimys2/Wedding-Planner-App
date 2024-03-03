// import the model files
const User = require("./User");
const Wedding = require("./Wedding");
const Invitees = require("./Invitees");

// set up the relationships
User.hasOne(Wedding, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Wedding.belongsTo(User, {
  foreignKey: "user_id",
});

Wedding.hasMany(Invitees, {
  foreignKey: "wedding_id",
  onDelete: "CASCADE",
});

Invitees.belongsTo(Wedding, {
  foreignKey: "wedding_id",
});

// export modules
module.exports = { User, Wedding, Invitees };
