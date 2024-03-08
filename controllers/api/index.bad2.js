  // MJS 3.6.24 - BAD /controller/api/index file. 
  // import files
  const router = require("express").Router();
  const userRoutes = require("./userRoutes");
  // const weddingRoutes = require("./weddingRoutes");
  // const inviteesRoutes = require("./inviteesRoutes");
  
  // when a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder
  router.use("./users", userRoutes);
  // router.use("./wedding", weddingRoutes);
  // router.use("./invitees", inviteesRoutes);

// MJS 3.6.24 - Simple /api/hello route to get one working before loading several files for /api, 
// which currently is 100% broke.
router.get('/hello', async (req, res) => {
  try {
      res.status(200).json("MJS api/hello route in controller/api/index.js found!");
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// export module
module.exports = router;