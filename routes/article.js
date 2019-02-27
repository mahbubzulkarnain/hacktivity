const router = require('express').Router();
const {isLogin} = require('../helpers/auth');
const Article = require('../controllers/ArticleController');


router
    .get('/view/:slug', Article.view)
    .get('/destroy/:id', isLogin, Article.destroy);

router
    .get('/create', isLogin, Article.createForm)
    .post('/create', isLogin, Article.createPost);

router
    .get('/edit/:id', isLogin, Article.updateForm)
    .post('/edit/:id', isLogin, Article.updatePost);

router
    .get('/', Article.list);

module.exports = router;