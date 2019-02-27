const {User} = require('../models');
const {setLogin} = require('../helpers/auth');
const url = require('url');
const bcrypt = require('bcrypt');

class AuthController {
    static registerForm(req, res) {
        res.render('pages/auth/register')
    }

    static registerPost({body}, res) {
        res.locals.body = body;
        User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            username: body.username,
            password: body.password
        })
            .then(() => {
                res.redirect(url.format({
                    pathname: '/login',
                    query: {
                        username: body.username
                    }
                }))
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
            })
    }

    static loginForm({query}, res, next) {
        let username
        if (query && query.username) {
            username = query.username
        }
        res.render('pages/auth/login', {username})
    }

    static loginPost(req, res, next) {
        const {body} = req;
        User.findOne({
            username: body.username
        })
            .then((user) => {
                if (user) {
                    bcrypt.compare(body.password, user.password, (err, success) => {
                        console.log(body.password, user.password, success, 'tidak ada error');
                        if (success) {
                            setLogin(req, user);
                            res.redirect('/')
                        } else {
                            next(err)
                        }
                    })
                } else {
                    next(`Not found`)
                }
            })
            .catch(next);
    }

    static logout(req, res, next) {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    next(err)
                }
                res.redirect('/')
            })
        }
    }

    static facebookCallback(req, res, next) {
        const {user} = req;
        User.findOne({
            fbToken: user.id
        })
            .then((user) => {
                if (user) {
                    setLogin(req, user)
                }
            })
            .catch(next)
    }

    static checkLoginMiddleware(req, res, next) {
        if (req.session && req.session.user && req.session.user.id) {
            User.findByPk(req.session.user.id)
                .then((user) => {
                    if (user) {
                        res.locals.isLogin = true;
                        res.locals.user = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username
                        }
                    } else {
                        res.locals.isLogin = false;
                        res.locals.user = null
                    }
                    next();
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        res.locals.error = err
                    }
                    res.locals.isLogin = false;
                    res.locals.user = null;
                    next();
                })
        } else {
            res.locals.isLogin = false;
            res.locals.user = null;
            next()
        }
    }
}

module.exports = AuthController;