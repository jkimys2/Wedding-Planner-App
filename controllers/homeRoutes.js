// MJS 3.5.24 - Orig code from MJS hw14 blogPost and uri act 14-28 mp. 
const router = require('express').Router();
const { Wedding, User } = require('../models');
// const withAuth = require('../utils/auth');

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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/ 

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
