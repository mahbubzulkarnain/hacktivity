module.exports = function (input) {
    return input.replace(/\s+/g, '_').replace(/[^\w]/gi, '').toLowerCase() + '_' + (new Date().getTime() + '').slice(-8)
};