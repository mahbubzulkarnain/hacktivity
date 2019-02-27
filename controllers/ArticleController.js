const {Article} = require('../models');

class ArticleController {
    static list(req, res, next) {
        res.send('list')
    }

    static createForm(req, res, next) {
        res.send('createForm')
    }

    static createPost(req, res, next) {
        res.send('createPost')
    }

    static updateForm(req, res, next) {
        res.send('updateForm')
    }

    static updatePost(req, res, next) {
        res.send('updatePost');
    }

    static destroy(req, res, next) {
        res.send('destroy')
    }
}

module.exports = ArticleController;