const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const compression = require('compression');

const validator = require('express-validator');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const helmet = require('helmet');
const csp = require('express-csp-header');

const logger = require('morgan');

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use('/bs', express.static(path.join(__dirname + '/node_modules/bootstrap/dist')))
    .use('/mde', express.static(path.join(__dirname + '/node_modules/simplemde/dist')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

app
    .use(cookieParser())
    .use(session({
        secret: 'Hacktivity*&@@#!$*',
        name: 'Hacktivity',
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
    .use(logger('dev'))
    .use(compression());

app
    .use('/article', require('./routes/article'))
    .get('/', (req, res) => res.render('pages/index'))
    .use('/', require('./routes/auth'));

app
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
