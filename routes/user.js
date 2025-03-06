var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user-helper');

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user || null;  // Ensuring `user` is always defined
  res.render('user/intro', { user, user: true });
});

/* User Signup */
router.get('/SignIn', (req, res) => {
  res.render('user/signup');
});

router.post('/signUp', (req, res) => {  // Renamed to `signUp` for clarity
  userHelper.doSignup(req.body)
    .then((response) => {
      req.session.user = response;
      res.redirect('/');
    })
    .catch((err) => {
      console.error("Signup Error:", err);
      res.redirect('/SignIn');
    });
});

/* User Logout */
router.get('/LogOut', (req, res) => {
  console.log("Logout clicked");
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
    }
    res.redirect('/');
  });
});

/* User Login */
router.get('/logIn', (req, res) => {
  res.render('user/login');  // Fixed the incorrect admin login page
});

module.exports = router;
