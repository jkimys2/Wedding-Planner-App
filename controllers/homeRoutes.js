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
    console.log("Route / rendering homepage ....... ");
    res.render('homepage', { 
      weddings, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});  // end get / 

// Route /hp2 (homepage2) get returns all users and associated weddings.
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
    console.log("Route /hp2 rendering homepage2 ....... ");
    res.render('homepage2', { 
      weddings, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});  // end get /hp2 

// /invitee/7 type routes. Return users, weds and guests. MJS 3.9.24
router.get('/invitee/:id', async (req, res) => {
  const routeName = "/invitee/:id";
  const weddingRender = "wedding";
  const mainRender = "invitee"; 
  console.log("Starting GET route ", routeName, " no wed data => ", weddingRender, " else render ", mainRender); 
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Wedding }],
      // include: [{ model: Invitees }], // MJS 3.7.24 Wont work even once Invitees required.
    });
    console.log("Got user data .... Name: ", userData.dataValues.username, " id: ", userData.dataValues.id);
    const user = userData.get({ plain: true });

    // if weddding is null, force user to wedding screen. 
    const wed = userData.dataValues.wedding; 
    if (wed === null) {
      console.log("Wedding data is null => new user => go to wedding screen.");
      // alert("Please enter new wedding data"); // doesn't work here
      const wedData = {};
      // Following gives "Error getting profile2 data" if wedData is null or {};
      // const wedding = wedData.get({ plain: true}); 
      // just leave out wedding since no data exists!
      res.render(weddingRender, {...user, logged_in: true } );
      return; // un-reachable, but just in case
    }
  
    console.log("Route ", routeName, " got wedding data "); 

      // Now get wedding-invitee data  
        const wedTitle = wed.dataValues.event_title;
        const wedID = wed.dataValues.id;
        console.log("Wedding Title: ", wedTitle, " id: ", wedID);

        const wedData = await Wedding.findByPk(wedID, {
          include: [{ model: Invitees }],
        });
        const wedding = wedData.get({ plain: true});
        res.render(mainRender, {...user, ...wedding, logged_in: true});
  
  } catch (err) {
    console.log("Error in Route ", routeName, " while getting user-wedding-invitee data");
    res.status(500).json(err);
  } // end try-catch
});  // end Route GET /invitee/:id 

// /invitee2/7 type routes.  MJS 3.9.24
router.get('/invitee2/:id', async (req, res) => {
  const guestID = req.params['id'];
  const routeName = "/invitee2/:id " + guestID;
  const weddingRender = "wedding2";
  const mainRender = "invitee2"; 
  console.log("Starting GET route ", routeName, " If no wed data => ", weddingRender, " else => ", mainRender); 
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Wedding }],
      // include: [{ model: Invitees }], // MJS 3.7.24 Wont work even once Invitees required.
    });
    console.log("Got user data .... Name: ", userData.dataValues.username, " id: ", userData.dataValues.id);
    const user = userData.get({ plain: true });

    // if weddding is null, force user to wedding screen. 
    const wed = userData.dataValues.wedding; 
    if (wed === null) {
      console.log("Wedding data is null => new user => go to wedding screen.");
      // alert("Please enter new wedding data"); // doesn't work here
      const wedData = {};
      // Following gives "Error getting profile2 data" if wedData is null or {};
      // const wedding = wedData.get({ plain: true}); 
      // just leave out wedding since no data exists!
      res.render(weddingRender, {...user, logged_in: true } );
      return; // un-reachable, but just in case
    }
  
    console.log("Route ", routeName, " got wedding data "); 

      // Now get wedding-invitee data 
        const wedTitle = wed.dataValues.event_title;
        const wedID = wed.dataValues.id;
        console.log("Wedding Title: ", wedTitle, " id: ", wedID);

        const wedData = await Wedding.findByPk(wedID, {
          include: [{ model: Invitees }],
        });
        const wedding = wedData.get({ plain: true});

        const guestData = await Invitees.findByPk(guestID, {        });
        const guest = guestData.get({ plain: true});

        res.render(mainRender, {...user, ...wedding, logged_in: true, "guestID": guestID, "guest": guest });
  
  } catch (err) {
    console.log("Error in Route ", routeName, " while getting user-wedding-invitee data");
    res.status(500).json(err);
  } // end try-catch
});  // end Route GET /invitee2/:id

// Route /profile displays user, wed and invitees data. MJS 3.6.24
router.get('/profile2', withAuth2, async (req, res) => {
  const routeName = "/profile2";
  const weddingRender = "wedding2";
  const mainRender = "profile2"; 
  console.log("Starting GET route ", routeName, " no wed data => ", weddingRender, " else render ", mainRender); 
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Wedding }],
      // include: [{ model: Invitees }], // MJS 3.7.24 Wont work even once Invitees required.
    });
    console.log("Got user data .... Name: ", userData.dataValues.username, " id: ", userData.dataValues.id);
    const user = userData.get({ plain: true });

    // if weddding is null, force user to wedding screen. 
    const wed = userData.dataValues.wedding; 
    if (wed === null) {
      console.log("Wedding data is null => new user => go to wedding screen.");
      // alert("Please enter new wedding data"); // doesn't work here
      const wedData = {};
      // Following gives "Error getting profile2 data" if wedData is null or {};
      // const wedding = wedData.get({ plain: true}); 
       // just leave out wedding since no data exists!
       res.render(weddingRender, {...user, logged_in: true } );
       return; // un-reachable, but just in case
    }
  
    console.log("Route ", routeName, " got wedding data "); 

      // Now get wedding-invitee data 
        const wedTitle = wed.dataValues.event_title;
        const wedID = wed.dataValues.id;
        console.log("Wedding Title: ", wedTitle, " id: ", wedID);

        const wedData = await Wedding.findByPk(wedID, {
          include: [{ model: Invitees }],
        });
        const wedding = wedData.get({ plain: true});

        res.render(mainRender, {...user, ...wedding, logged_in: true});
  
  } catch (err) {
    console.log("Error in Route ", routeName, " while getting user-wedding-invitee data");
    res.status(500).json(err);
  } // end try-catch
});  // end GET /profile2

// MJS 3.4.24 - GET profile - shows user, wedding and list of invitees. 
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  const routeName = "/profile";
  const weddingRender = "wedding";
  const mainRender = "profile"; 
  console.log("Starting GET route ", routeName, " no wed data => ", weddingRender, " else render ", mainRender); 
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Wedding }],
      // include: [{ model: Invitees }], // MJS 3.7.24 Wont work even once Invitees required.
    });
    console.log("Got user data .... Name: ", userData.dataValues.username, " id: ", userData.dataValues.id);
    const user = userData.get({ plain: true });

    // if weddding is null, force user to wedding screen. 
    const wed = userData.dataValues.wedding; 
    if (wed === null) {
      console.log("Wedding data is null => new user => go to wedding screen.");
      // alert("Please enter new wedding data"); // doesn't work here
      const wedData = {};
      // Following gives "Error getting profile2 data" if wedData is null or {};
      // const wedding = wedData.get({ plain: true}); 
      // just leave out wedding since no data exists!
      res.render(weddingRender, {...user, logged_in: true } );
      return; // un-reachable, but just in case
    }
  
    console.log("Route ", routeName, " got wedding data ", wed.dataValues); 

      // Now get wedding-invitee data 
        const wedTitle = wed.dataValues.event_title;
        const wedID = wed.dataValues.id;
        console.log("Wedding Title: ", wedTitle, " id: ", wedID);

        const wedData = await Wedding.findByPk(wedID, {
          include: [{ model: Invitees }],
        });
        const wedding = wedData.get({ plain: true});
        res.render(mainRender, {...user, ...wedding, logged_in: true});
  
  } catch (err) {
    console.log("Error in Route ", routeName, " while getting user-wedding-invitee data");
    res.status(500).json(err);
  } // end try-catch
});  // end GET /profile


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
