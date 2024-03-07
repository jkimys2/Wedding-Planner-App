  // import files
  const router = require("express").Router();
  const userRoutes = require("./userRoutes");
  const weddingRoutes = require("./weddingRoutes");
  const inviteesRoutes = require("./inviteesRoutes");
  
  // when a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder
  router.use("/users", userRoutes);
  router.use("/wedding", weddingRoutes);
  router.use("/invitees", inviteesRoutes);
  
  // export module
  module.exports = router;