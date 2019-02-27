const router = (require('express')).Router();
const Home = require('../controllers/HomeController');

router
    .use(Home.checkLoginMiddleware)
    .use((req, res, next) => {
        res.locals.htmlEntities = require('../helpers/htmlEntities');
        res.locals.timeAgo = require('../helpers/timeAgo');
        next()
    });

module.exports = router;