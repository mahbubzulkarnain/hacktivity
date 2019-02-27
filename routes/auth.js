const router = require('express').Router();
const Auth = require('../controllers/AuthController');

router
    .get('/register', Auth.registerForm)
    .post('/register', Auth.registerPost);

router
    .get('/login', Auth.loginForm)
    .post('/login', Auth.loginPost);

module.exports = router;