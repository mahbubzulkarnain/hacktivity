const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const validator = require('express-validator');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const helmet = require('helmet');
const csp = require('express-csp-header');

app
    .locals.webname = 'Hacktivity';

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use('/bs', express.static(path.join(__dirname + '/node_modules/bootstrap/dist')))
    .use('/mde', express.static(path.join(__dirname + '/node_modules/simplemde/dist')))
    .use('/jq', express.static(path.join(__dirname + '/node_modules/jquery/dist')))
    .use('/swal', express.static(require('path').join(__dirname + '/node_modules/sweetalert/dist/')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

app
    .use(cookieParser())
    .use(session({
        secret: 'Hacktivity*&@@#!$*',
        name: app.locals.webname,
        resave: false,
        saveUninitialized: true,
        httpOnly: true,
        // secure: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(validator({customValidators: {}}))
    .use(require('./middlewares/app'))
    .use(require('morgan')('dev'))
    .use(require('compression')());

app
    .use('/article', require('./routes/article'))
    .use('/@:username', (req, res, next) => {
        if (req.params && req.params.username) {
            res.locals.paramUsername = req.params.username;
        }
        next()
    }, require('./routes/profile'))
    .use('/', require('./routes/home'));

app
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
