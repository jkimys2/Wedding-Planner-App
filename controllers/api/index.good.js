// MJS 3.4.24 - Controllers/api/index.js from Act 14-28 mp. 
console.log("Starting controller/api/index.js");
const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
// router.use('/projects', projectRoutes);

// MJS 3.6.24 - Simple /api/hello route to get one working before loading several files for /api, 
// which currently is 100% broke.
router.get('/hello', async (req, res) => {
  try {
      res.status(200).json("MJS api/hello route in controller/api/index.js found!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
