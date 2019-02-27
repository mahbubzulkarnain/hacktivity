const router = require('express').Router();
const {isNotLogin, isLogin} = require('../helpers/auth');
const Article = require('../controllers/ArticleController');


router
    .get('/', Article.list)
    .get('/destroy/:id', Article.destroy);

router
    .get('/create', Article.createForm)
    .post('/create', Article.createPost);

router
    .get('/edit/:id', Article.updateForm)
    .post('/edit/:id', Article.updatePost);

module.exports = router;