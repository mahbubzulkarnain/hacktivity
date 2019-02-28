const router = require('express').Router();
const Profile = require('../controllers/ProfileController');
const {isLogin} = require('../helpers/auth');
const upload = require('../helpers/images/avatar').upload;

router
    .get('/setting', isLogin, Profile.settingForm)
    .post('/setting', isLogin, upload, Profile.settingPost)
    .get('/', Profile.view);

module.exports = router;