const marked = require('marked');
const {Article} = require('../models');

class ArticleController {
    static list(req, res, next) {
        Article.scope('withDBAuthor').findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then((props) => {
                props.map(item => {
                    item.content = marked(item.content.substring(0, 200)+'...')
                });
                res.render('pages/article/list', {props})
            })
            .catch(next)
    }

    static createForm(req, res, next) {
        res.render('pages/article/create')
    }

    static createPost({body}, res, next) {
        Article.create({
            title: body.title,
            subheading: body.subheading,
            content: body.content,
            authorId: res.locals.user.id
        })
            .then(() => {
                res.redirect('/article')
            })
            .catch(next)
    }

    static updateForm(req, res, next) {
        res.render('pages/article/update')
    }

    static updatePost(req, res, next) {
        res.send('updatePost');
    }

    static view({params}, res, next) {
        Article.findOne({
            where: {
                slug: params.slug
            }
        })
            .then((prop) => {
                if (prop) {
                    prop.content = marked(prop.content);
                    res.render('pages/article/view', {prop})
                } else {
                    res.redirect('/article')
                }
            })
            .catch((err) => {
                res.redirect('/article')
            })
    }

    static destroy(req, res, next) {
        res.send('destroy')
    }
}

module.exports = ArticleController;