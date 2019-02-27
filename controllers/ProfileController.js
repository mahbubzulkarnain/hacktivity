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
                props.map(item => {
                    item.content = marked(item.content.substring(0, 200) + '...')
                });
                res.render('pages/profile/view', {props, profile: userDetail})
            })
            .catch(next)
    }

    static setting(req, res, next) {
        if (!res.locals.paramUsername) next();
        User.findByPk(res.locals.user.id)
            .then((user) => {
                res.render('pages/profile/setting')
            })
    }
}

module.exports = ProfileController;