const sequelize = require('../config/connection');
const { User, Wedding, Invitees } = require('../models');
// const { User, Project, Post } = require('../models');

const userData = require('./userData.json');
const wedData = require('./weddingData.json');
const invData = require('./inviteesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); 

  console.log("Creating user data ...........................");
  const users = await User.bulkCreate(userData, {  // note data order may vary.
    individualHooks: true,
    returning: true,
  });

  // const apost = await Post.create({title: "Blog Title", contents: "Randome contents", user_id: 1,});
  console.log("Creating wedding data ...........................");
  const weds = []; // must create this as we add weddings one by one 
  let count = 0;
  for (const wed of wedData) {
    console.log("Creating wedding ", count, " named ", wed.event_title);
    const newWed = await Wedding.create({
      ...wed,  // modulus makes sure we don't try to access users[3] when only [0-2] array. 
      user_id: users[(count+1)%userData.length].id, // count+1 => make user-wed ids different for testing.
    });
    weds.push(newWed);
    count++;
  }
  const wedLength = count; 

  console.log("Creating invitee data ...........................");
  count = 0;
  for (const inv of invData) {
    console.log("Creating invitee ", count, " named ", inv.first_name);
    await Invitees.create({
      ...inv,  // mod % wedLength -1 so last wed gets no invitees for testing.
      wedding_id: weds[(count+1)%(wedLength-1)].id,  // count + 1 => invitee[0] has fk id of weds[1], etc. 
    });
    count++;
  }

  console.info("Wedding: Finished creating seed data .........................");
  for (let cnt=0; cnt<users.length; cnt++) {  // note id order not always 1, 2, 3. Create 1-by-1 if order needed.
    console.log("User ", cnt, " ID ", users[cnt].id, " name ", users[cnt].username); 
  }
  // DONT show password - plus formatting awful! plus lots of xtra data. console.log("Displaying Users", users); 

  process.exit(0);
};

seedDatabase();
