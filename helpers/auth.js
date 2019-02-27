module.exports = {
    isLogin(req, res, next) {
        if (res.locals.isLogin) {
            next()
        } else {
            res.redirect('/login')
        }
    },
    isNotLogin(req, res, next) {
        if (!res.locals.isLogin) {
            next()
        } else {
            res.redirect('/')
        }
    },
    setLogin(req, user) {
        req.session.user = {
            id: user.id,
            salt: user.salt
        };

    }
};