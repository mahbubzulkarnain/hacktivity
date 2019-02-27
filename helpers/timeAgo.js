module.exports = function (date) {
    let seconds = Math.floor((new Date(Date.now()) - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " tahun yang lalu";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " bulan yang lalu";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " hari yang lalu";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " jam yang lalu";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " menit yang lalu";
    }
    if (!!!+seconds || seconds < 30) {
        return "beberapa saat yang lalu";
    }
    return Math.floor(seconds) + " detik yang lalu";
};