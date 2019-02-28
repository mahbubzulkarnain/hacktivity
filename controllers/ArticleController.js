const marked = require('marked');
const fs = require('fs');
const {Article, Tags, TagsArticles} = require('../models');

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

    static createPost(req, res, next) {
        const {body} = req;
        let path = '';
        if (req.files && req.files[0]) {
            path = req.files[0].path
        }
        Article.create({
            title: body.title,
            subheading: body.subheading,
            content: body.content,
            authorId: res.locals.user.id,
            thumbhnail: path
        })
            .then((article) => {
                if (body.tags) {
                    // return res.json(body.tags);
                    let tags = body.tags.split(',');
                    return Promise.all(tags.map(async item => {
                        try {
                            item = item.replace(/^\s+|\s+$/gi, '').replace(/[^\w]/gi, '');
                            if (item) {
                                let tag = await Tags.findOne({where: {name: item}});
                                if (!tag || !tag.id) {
                                    tag = await Tags.create({
                                        name: item
                                    })
                                }
                                let tagArticle = await TagsArticles.findOne({
                                    where: {
                                        tagId: tag.id,
                                        articleId: article.id
                                    }
                                });
                                if (!tagArticle || !tagArticle.id) {
                                    tagArticle = await TagsArticles.create({
                                        articleId: article.id,
                                        tagId: tag.id
                                    })
                                }
                            }
                        } catch (e) {
                            console.log(e)
                        }
                    }))
                } else {
                    res.redirect('/article')
                }
            })
            .then(() => {
                res.redirect('/article')
            })
            .catch(next)
    }

    static updateForm({params}, res, next) {
        Article.findOne({
            where: {
                slug: params.slug
            }
        })
            .then((prop) => {
                if (!prop) next('Not found');
                res.render('pages/article/update', {prop})
            })
            .catch(next)
    }

    static updatePost(req, res, next) {
        const {params, body} = req;
        Article.findOne({
            where: {
                slug: params.slug,
                authorId: res.locals.user.id
            }
        })
            .then((article) => {
                let update = {
                    title: body.title,
                    subheading: body.subheading,
                    content: body.content,
                };
                if (req.files && req.files[0]) {
                    try {
                        fs.unlinkSync(article.thumbhnail);
                    } catch (e) {
                        console.log(e)
                    }
                    Object.assign(update, {
                        thumbhnail: req.files[0].path
                    })
                }
                return article.update(update)
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
                // return res.json(prop)
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