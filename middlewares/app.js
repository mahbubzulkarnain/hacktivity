const router = (require('express')).Router();
const Auth = require('../controllers/AuthController');

router
    .use(Auth.checkLoginMiddleware)
    .use((req, res, next) => {
        res.locals.htmlEntities = require('../helpers/htmlEntities');
        next()
    });

module.exports = router;