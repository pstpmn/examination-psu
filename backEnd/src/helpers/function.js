var moment = require('moment');
const config = require('./../../src/config/env');
const md5 = require("blueimp-md5");

exports.displayError = async (error) => {
    if (config.nodeEnv === "development") {
        console.log(error);
        return error;
    } else {
        return false;
    }
}

exports.getDateTimeToday = () => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time
}

exports.getDateToday = () => {
    var today = new Date();
    let month;
    let day;
    if ((today.getMonth() + 1) <= 10) {
        month = "0" + (today.getMonth() + 1)
    }
    if ((today.getDate()) <= 10) {
        day = "0" + today.getDate()
    }
    var date = today.getFullYear() + '-' + month + '-' + day;
    return date
}

exports.getDateReset = (millisecond) => {
    let date = new Date(millisecond);
    return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

exports.createToken = (userData) => {
    return jwt.sign({
        citizen_id: userData.citizen_id,
        username: userData.username,
        phoneNumber: userData.phoneNumber,
    }, privateKey.token, { expiresIn: privateKey.expToken });
}

exports.validatedToken = (token) => {
    if (token != undefined) {
        try {
            jwt.verify(token, privateKey.token);
            return true
        } catch (e) {
            return false;
        }
    }
    else {
        return false;
    }
}

exports.createdMd5 = (data) => {
    return md5(data);
}

exports.getClientIp = async (req) => {
    return (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress;
};

exports.diffTimeCurrent = async (date) => {
    var now = new Date();
    var then = date;
    return moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
};