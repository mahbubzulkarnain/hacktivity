class AuthController {
    static registerForm(req, res, next) {

    }

    static registerPost(req, res, next) {

    }

    static loginForm(req, res, next) {
        res.render('pages/auth/login')
    }

    static loginPost({body}, res, next) {

    }
}

module.exports = AuthController;