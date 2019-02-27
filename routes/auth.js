const router = require('express').Router();
const Auth = require('../controllers/AuthController');
const passport = require('passport');
const csrfProtection = (require('csurf'))({cookie: true});
const {isNotLogin, isLogin} = require('../helpers/auth');

router
    .get('/logout', isLogin, Auth.logout)
    .use(isNotLogin);

router
    .get('/register', Auth.registerForm)
    .post('/register', Auth.registerPost);

router
    .get('/login/facebook', passport.authenticate('facebook', {
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true
    }))
    .get('/login/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), Auth.facebookCallback)
    .post('/login', Auth.loginPost)
    .get('/login', Auth.loginForm);

module.exports = router;