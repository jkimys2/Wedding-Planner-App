const sequelize = require('../config/connection');
const { User, Wedding } = require('../models');
// const { User, Project, Post } = require('../models');

const userData = require('./userData.json');
const wedData = require('./weddingData.json');
// const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const apost = await Post.create({title: "Blog Title", contents: "Randome contents", user_id: 1,});
  console.log("Creating wedding data ...........................");
  let count = 0;
  for (const wed of wedData) {
    console.log("Creating wedding ", count, " named ", wed.event_title);
    await Wedding.create({
      ...wed,
      user_id: users[count].id,
    });
    count++;
  }

  console.info("MJS Created seed data");
  process.exit(0);
};

seedDatabase();
