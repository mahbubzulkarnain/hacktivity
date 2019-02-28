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

    static updateForm({params}, res, next) {
        Article.findOne({
            where: {
                slug: params.slug,
                authorId: res.locals.user.id
            }
        })
            .then((prop) => {
                if (!prop) next('Not found');
                res.render('pages/article/update', {prop})
            })
            .catch(next)
    }

    static updatePost({params, body}, res, next) {
        Article.findOne({
            where: {
                slug: params.slug,
                authorId: res.locals.user.id
            }
        })
            .then((article) => {
                return article.update({
                    title: body.title,
                    subheading: body.subheading,
                    content: body.content,
                })
            })
            .then(() => {
                res.redirect(`/article/view/${params.slug}`)
            })
            .catch(next)
    }

    static view({params}, res, next) {
        Article.scope('withDBAuthor').findOne({
            where: {
                slug: params.slug
            }
        })
            .then((prop) => {
                // res.json(prop)
                if (prop) {
                    res.render('pages/article/view', {prop})
                } else {
                    res.redirect('/article')
                }
            })
            .catch((err) => {
                res.redirect('/article')
            })
    }

    static destroy({params}, res, next) {
        Article.findOne({
            where: {
                slug: params.slug,
                authorId: res.locals.user.id
            }
        })
            .then((article) => {
                return article.destroy()
            })
            .then(() => {
                res.redirect('/article')
            })
            .catch((err) => {
                console.log(err);
                res.redirect(`/article/view/${params.slug}`)
            })
    }
}

module.exports = ArticleController;