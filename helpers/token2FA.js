const authenticator = require('authenticator');

module.exports = {
    getAnswer: (req) => {
        if (req instanceof String) {
            return authenticator.generateToken(req.replace(/ /g, ''));
        } else {
            if (req.session){
                return authenticator.generateToken(req.session.token_question.replace(/ /g, ''));
            }
        }
    },
};