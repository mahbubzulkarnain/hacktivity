const marked = require('marked');
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
                res.render('pages/profile/setting', {user})
            })
            .catch(next)
    }

    static settingPost({body}, res, next) {
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
                return user.update(updateDate)
            })
            .then(() => {
                res.redirect(`/@${res.locals.user.username}`)
            })
            .catch(next)
    }
}

module.exports = ProfileController;