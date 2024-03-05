const router = require('express').Router();

console.log("Starting to load controllers/index.js routes.");
console.info("Starting to load controllers/index.js routes.");
// const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
    try {
        res.status(200).json("MJS home route found!");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
