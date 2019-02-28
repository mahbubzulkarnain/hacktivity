const router = require('express').Router();
const {isLogin} = require('../helpers/auth');
const Article = require('../controllers/ArticleController');
const upload = require('../helpers/images/article').upload;


router
    .get('/view/:slug', Article.view)
    .get('/destroy/:slug', isLogin, Article.destroy);

router
    .get('/create', isLogin, Article.createForm)
    .post('/create', isLogin, upload, Article.createPost);

router
    .get('/edit/:slug', isLogin, Article.updateForm)
    .post('/edit/:slug', isLogin, upload, Article.updatePost);

router
    .get('/', Article.list);

module.exports = router;