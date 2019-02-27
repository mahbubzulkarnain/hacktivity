const router = require('express').Router();
const Home = require('../controllers/HomeController');
const passport = require('passport');
const csrfProtection = (require('csurf'))({cookie: true});
const {isNotLogin, isLogin} = require('../helpers/auth');

router
    .get('/logout', isLogin, Home.logout);

router
    .get('/register', isNotLogin, Home.registerForm)
    .post('/register', isNotLogin, Home.registerPost);

router
    .get('/login/facebook', passport.authenticate('facebook', {
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true
    }))
    .get('/login/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), Home.facebookCallback)
    .post('/login', isNotLogin, Home.loginPost)
    .get('/login', isNotLogin, Home.loginForm);

router
    .get('/', (req, res) => res.render('pages/index'));

module.exports = router;