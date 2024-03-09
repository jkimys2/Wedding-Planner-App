
// import files
const router = require("express").Router();
const { User } = require("../../models");

// MJS 3.6.24 - Simple /api/userS/hello get route to get one working before loading several files for /api, 
// which currently is 100% broke.
router.get('/hello', async (req, res) => {
  try {
      res.status(200).json("MJS api/userS/hello route in controller/api/userRoutes.js found!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// if a GET request is made to /api/users (note S at end) a fixed msg is sent
router.get("/", async (req, res) => {
  res.status(200).json('MJS api/userS route hit!');
});

// if a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// if a POST request is made to /api/users/login, the function checks to see 
// if the user information matches the information in the database and logs the user in. // If correct, the user ID and logged-in state are saved to the session within the request object.
router.post("/login", async (req, res) => {
  try {
    console.log("Starting route api/users/login POST");
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// if a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;