// MJS 3.4.24 - Orig from my hw14 - uri act 14-28 mp
const withAuth2 = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login2');
  } else {
    next();
  }
};

module.exports = withAuth2;
