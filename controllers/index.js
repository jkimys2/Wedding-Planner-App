const router = require('express').Router();

console.info("Starting to load controllers/index.js routes.");
// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');  // Uncommented 3.5.24 ... now the fun begins.
 
router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

// MJS 3.4.24 - First simple route to get one working before loading several files for 
// /api and homeroutes.
router.get('/hello', async (req, res) => {
    try {
        res.status(200).json("MJS /hello route in controller/index.js found!");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;