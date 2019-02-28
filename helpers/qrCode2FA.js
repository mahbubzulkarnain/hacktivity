const authenticator = require('authenticator');
const qrcode = require('qrcode');

module.exports = function (res, user, cb) {
    let formattedKey = authenticator.generateKey();
    if (user.usedToken2FA) {
        formattedKey = user.token2FA;
    }
    // let formattedToken = authenticator.generateToken(formattedKey.replace(/ /g, ''));
    let keyRandom = `otpauth://totp/${res.locals.webname}:${user.email}?secret=${formattedKey.replace(/ /g, '')}&issuer=${res.locals.webname}&digits=6&period=30`;
    qrcode.toDataURL(keyRandom, {errorCorrectionLevel: "L", type: "image/png"}, (err, data) => {
        if (err) {
            console.error(err);
        }
        cb(formattedKey, data)
    });
};