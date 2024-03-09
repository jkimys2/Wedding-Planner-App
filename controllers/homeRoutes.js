// MJS 3.5.24 - Orig code from MJS hw14 blogPost and uri act 14-28 mp. 
const router = require('express').Router();
const { Wedding, User, Invitees } = require('../models');
const withAuth = require('../utils/auth');
const withAuth2 = require('../utils/auth2');
 
// - / get returns all users and associated weddings.
router.get('/', async (req, res) => {
  try {
    console.log("Route / in controllers/homeroutes.js beginning ... ");
    // Get all weddings and JOIN with user data
    const wedData = await Wedding.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],  // leave out the password!
        },
      ],
    });

    // Serialize data so the template can read it
    const weddings = wedData.map((wedding) => wedding.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      weddings, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});  // end get / 

// - /hp2 (homepage2) get returns all users and associated weddings.
router.get('/hp2', async (req, res) => {
  try {
    console.log("Route /hp2 in controllers/homeroutes.js beginning ... ");
    // Get all weddings and JOIN with user data
    const wedData = await Wedding.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],  // leave out the password!
        },
      ],
    });

    // Serialize data so the template can read it
    const weddings = wedData.map((wedding) => wedding.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage2', { 
      weddings, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});  // end get /hp2 


/* 
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

router.get('/profile2', withAuth2, async (req, res) => {
  console.log("Starting route /profile2");
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Wedding }],
      // include: [{ model: Invitees }], // MJS 3.7.24 Wont work even once Invitees required.
    });
    console.log("Got user data .... ");
    console.log("User data. Name: ", userData.dataValues.username, " id: ", userData.dataValues.id);

    const user = userData.get({ plain: true });
    console.log("Got user-wedding data .... ");
    const wed = userData.dataValues.wedding; 
    console.log("userData.dataValues is ", userData.dataValues, " wed is ", wed); 

    if (wed === null) {
      console.log("Wedding data is null => new user => go to wedding screen.");
      // alert("Please enter new wedding data"); // doesn't work here
      const wedData = {};
      // console.log("Wedding data ", wedData.dataValues);
      // gives "Error getting profile2 data" if wedData is null or {};
      // const wedding = wedData.get({ plain: true}); 
      // const wedding = {};
      res.render('wedding2', {
        ...user, 
        logged_in: true
      });
    } else {
        // Now get invitee data 
        const wedTitle = wed.dataValues.event_title;
        const wedID = wed.dataValues.id;
        console.log("Wedding Title: ", wedTitle, " id: ", wedID);

        const wedData = await Wedding.findByPk(wedID, {
          include: [{ model: Invitees }],
        });
        // console.log("Wedding data ", wedData.dataValues);
        const wedding = wedData.get({ plain: true});

        res.render('profile2', {
          ...user, ...wedding, 
          logged_in: true
        });
  } // end if-else
  
  } catch (err) {
    console.log("Error getting /profile2 data");
    res.status(500).json(err);
  }
}); 

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  console.log("Starting route /profile");
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Wedding }],
      // include: [{ model: Invitees }], // MJS 3.7.24 Wont work even once Invitees required.
    });
    // console.log("User Data with wedding info is ", userData);
    console.log("User data. Name: ", userData.dataValues.username, " id: ", userData.dataValues.id);
    const wed = userData.dataValues.wedding; 
    console.log("User data wedding is ", wed.dataValues);
    const wedTitle = wed.dataValues.event_title;
    const wedID = wed.dataValues.id;
    console.log("Wedding Title: ", wedTitle, " id: ", wedID);

    const user = userData.get({ plain: true });

    // Now get the invitees based upon the wedding
    console.log('Getting wedding data assoicated with pkey ', wedID); 
    const wedData = await Wedding.findByPk(wedID, {
      include: [{ model: Invitees }],
    });
    console.log("Wedding data ", wedData.dataValues);
    const wedding = wedData.get({ plain: true});

    res.render('profile', {
      ...user, ...wedding, 
      logged_in: true
    });
  } catch (err) {
    console.log("Error in /profile route.");
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  console.log("Getting route /login ... ");
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  console.log("User not logged in, rendering login page ...");
  res.render('login');
});

router.get('/login2', (req, res) => {
  console.log("Getting route /login2 ... ");
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile2');
    return;
  }
  console.log("User not logged in, rendering login2 page ...");
  res.render('login2');
});

module.exports = router;
