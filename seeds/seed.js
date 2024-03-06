const sequelize = require('../config/connection');
const { User } = require('../models');
// const { User, Project, Post } = require('../models');

const userData = require('./userData.json');
// const postData = require('./postData.json');
// const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const apost = await Post.create({title: "Blog Title", contents: "Randome contents", user_id: 1,});

/*  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
*/ 
  console.info("MJS Created seed data");
  process.exit(0);
};

seedDatabase();
