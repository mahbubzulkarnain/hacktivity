const router = require('express').Router();
const Profile = require('../controllers/ProfileController');
const {isLogin} = require('../helpers/auth');

router
    .get('/setting', isLogin, Profile.settingForm)
    .post('/setting', isLogin, Profile.settingPost)
    .get('/', Profile.view);

module.exports = router;