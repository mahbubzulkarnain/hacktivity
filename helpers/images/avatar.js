const multer = require('multer');
const fs = require('fs');
const slugParser = require('../slugParser');

const upload = multer({
    // limits: { fileSize: configAuth.max.image },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let array_dir = ('public/uploads/images/' + req.session.user.id + '/').split('/');
            let dir = '';
            array_dir.forEach(function (item) {
                if (item) {
                    dir += item + '/';
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                }
            });
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
                cb(null, req.session.user.username + '.png', file);
            } else {
                cb('Image ext not valide', 'Image ext not valide')
            }
        }
    })
}).any();
module.exports = {
    upload
};