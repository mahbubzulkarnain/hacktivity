const router = (require('express')).Router();
const Auth = require('../controllers/AuthController');

router.use(Auth.checkLoginMiddleware);

module.exports = router;