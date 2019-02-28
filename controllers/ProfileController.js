const qrCode2FA = require('../helpers/qrCode2FA');
const token2FA = require('../helpers/token2FA');
const {User, Article} = require('../models');

class ProfileController {
    static view(req, res, next) {
        if (!res.locals.paramUsername) next();
        let userDetail;
        User.findOne({
            where: {
                username: res.locals.paramUsername
            }
        })
            .then((user) => {
                if (!user) throw new Error(`Not found`);
                userDetail = user;
                return Article.scope('withDBAuthor').findAll({
                    where: {
                        authorId: user.id
                    }
                })
            })
            .then((props) => {
                res.render('pages/profile/view', {props, profile: userDetail})
            })
            .catch(next)
    }

    static settingForm(req, res, next) {
        User.findByPk(res.locals.user.id)
            .then((user) => {
                qrCode2FA(res, user, (formattedKey, qtimg) => {
                    req.session.token_question = formattedKey;
                    res.render('pages/profile/setting', {
                        prop: user,
                        qtimg,
                    })
                });
            })
            .catch(next)
    }

    static settingPost(req, res, next) {
        const {body} = req;
        User.findByPk(res.locals.user.id)
            .then((user) => {
                let updateDate = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    bio: body.bio
                };
                if (body.password && false) {
                    Object.assign(updateDate, {
                        password: body.password
                    })
                }
                if (req.files && req.files[0]) {
                    Object.assign(updateDate, {
                        avatar: req.files[0].path
                    })
                }
                if ((body.usedToken2FA === 'on') !== user.usedToken2FA && token2FA.getAnswer(req) === body.answer2fa) {
                    Object.assign(updateDate, {
                        usedToken2FA: !user.usedToken2FA,
                        token2FA: req.session.token_question
                    })
                }
                return user.update(updateDate)
            })
            .then(() => {
                res.redirect(`/@${res.locals.user.username}`)
            })
            .catch(next)
    }
}

module.exports = ProfileController;