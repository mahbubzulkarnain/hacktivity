module.exports = function (date) {
    const list = ['', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const newDate = new Date(date);
    return `${list[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
};