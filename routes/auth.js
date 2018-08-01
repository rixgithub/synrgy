var express = require('express');
var router = express.Router();
var passport = require('passport');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
	    return next();
	res.redirect('/');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SYNRGY', css: 'index.css' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  	res.render('login', { title: 'SYNRGY', css: 'login.css', message: req.flash('message') });
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  	res.render('signup', { title: 'SYNRGY', css: 'signup.css', message: req.flash('message') });
});

/* GET user home page. */
router.get('/user', isLoggedIn, function(req, res, next) {
  	res.render('userHome', { title: 'SYNRGY', user: req.user.userName, css: 'userHome.css'});
});

/* POST signup info. */
router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/user',
        failureRedirect: '/signup',
        failureFlash: true 
    })
);

/* POST login route */
router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: true 
    })
);

// log out user route
router.get('/logout', function(req, res){
  console.log(req.isAuthenticated());
  console.log(req.user);
  req.logout();
  console.log(req.isAuthenticated());
  console.log(req.user);
  res.redirect('/');
});

module.exports = router;
