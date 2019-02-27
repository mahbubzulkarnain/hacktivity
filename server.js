const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const compression = require('compression');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const helmet = require('helmet');
const csp = require('express-csp-header');

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use('/bs', express.static(path.join(__dirname + '/node_modules/bootstrap/dist')))
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
    .use(compression());

app
    .use('/', require('./routes/auth'))
    .get('/', (req, res) => res.render('pages/index'));

app
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
