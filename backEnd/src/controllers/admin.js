const adminModel = require('./../models/admin');
const usersModel = require('./../models/users');
const addressModel = require('./../models/address');

module.exports.login = async (req, res) => {
    let userData = await adminModel.getUsername(req.body.username)
    if (userData !== false) {
        let hashPass = fn.createdMd5(req.body.password);
        let validated = hashPass === userData.password;
        if (validated) {
            let createToken = fn.createToken(userData);
            await adminModel.setUpdateToken(userData.citizen_id, createToken);
            return res.status(200).json({
                token: createToken,
                username: userData.username,
                surName: userData.surName,
                lastName: userData.lastName,
                msg: 'Login successful',
                status: true
            })
        }
    }

    return res.status(401).json({
        msg: 'Username และ Password ไม่ถูกต้อง',
        status: false
    })

}

module.exports.index = async (req, res) => {
    //select users New today
    let newUsers = await usersModel.getNewUsersToday();
    let newUsersLength = await usersModel.getLengthUserNewToday();
    let newUsersLengthInThai = await usersModel.getLengthNewTodayInThai();
    let newUsersLengthForeign = await usersModel.getLengthNewTodayForeign();

    

    return res.status(200).json({
        newUsers: newUsers,
        countTodayAll: newUsersLength,
        countTodayInThai: newUsersLengthInThai,
        countTodayForeign: newUsersLengthForeign
    })
}

module.exports.auth = async (req, res) => {
    //select users New today
    let token = await adminModel.getToken(req.body.userToken);
    if (req.headers['token'] === token) {
        return res.status(200).json({
            status: true
        })
    } else {
        return res.status(401).json({
            status: false
        })
    }
}

module.exports.newUser = async (req, res) => {
    let newUsers = await usersModel.getNewUsersToday();

    return res.status(200).json({
        data: newUsers
    })
}


module.exports.searchUser = async (req, res) => {
    let sql = "SELECT * FROM users join foreign_address on foreign_address.address_id  = users.foreign_address_id  WHERE 1 ";


    if (req.body.fname !== '') {
        sql += "and (users.surName like '" + req.body.fname + "%') ";
    }
    if (req.body.fname !== '') {
        sql += "and (users.lastName like '" + req.body.lname + "%') ";
    }
    if (req.body.type !== '') {
        sql += "and (users.travelType like '" + req.body.type + "%') ";
    }
    if (req.body.phoneNumber !== '') {
        sql += "and (users.phoneNumber like '" + req.body.phoneNumber + "%') ";
    }
    if (req.body.citizenId !== '') {
        sql += "and (users.citizen_id like '" + req.body.citizenId + "%') ";
    }
    if (req.body.passport !== '') {
        sql += "and (users.passport like '" + req.body.passport + "%') ";
    }


    if (req.body.amphure !== '') {
        sql += "and (foreign_address.subDistrict like '" + req.body.amphure + "%') ";
    }
    if (req.body.district !== '') {
        sql += "and (foreign_address.district like '" + req.body.district + "%') ";
    }
    if (req.body.province !== '') {
        sql += "and (foreign_address.province like '" + req.body.province + "%') ";
    }
    if (req.body.country !== '') {
        sql += "and (foreign_address.country like '" + req.body.country + "%') ";
    }


    if (req.body.amphureE !== '') {
        sql += "and (users.amphures like '" + req.body.amphureE + "%') ";
    }
    if (req.body.districtE !== '') {
        sql += "and (users.district like '" + req.body.districtE + "%') ";
    }
    if (req.body.provinceE !== '') {
        sql += "and (users.province like '" + req.body.provinceE + "%') ";
    }




    if (req.body.dateTime !== '') {
        if (req.body.dateTimeE !== '') {
            sql += "and (createdAt BETWEEN '" + req.body.dateTime + "' AND '" + req.body.dateTimeE + "') ";
        }
        else {
            sql += "and (createdAt like '" + req.body.dateTime + "%') ";
        }
    }

    let result = await usersModel.getUserBySQL(sql)
    // console.log(result);
    return res.status(200).json({
        data: result
    })
}

module.exports.userInfo = async (req, res) => {
    let type = await usersModel.getTypeByCardID(req.params.id);
    let info = await usersModel.getUserByCardID(req.params.id);
    let foreign_address = await usersModel.getAddressForeign(info.foreign_address_id);


    console.log(foreign_address.subDistrict);

    if (type === 'ประเทศไทย') {
        // console.log(await addressModel.getDistricts(info.subDistrict));
        foreign_address.province = (await addressModel.getProvince(foreign_address.province)).name_th;
        foreign_address.district = (await addressModel.getAmphures(foreign_address.district)).name_th;
        foreign_address.subDistrict = (await addressModel.getDistricts(foreign_address.subDistrict)).name_th;

        info.province = (await addressModel.getProvince(info.province)).name_th;
        info.amphures = (await addressModel.getAmphures(info.amphures)).name_th;
        info.district = (await addressModel.getDistricts(info.district)).name_th;
    } else {
        info.province = (await addressModel.getProvince(info.province)).name_th;
        info.amphures = (await addressModel.getAmphures(info.amphures)).name_th;
        info.district = (await addressModel.getDistricts(info.district)).name_th;
    }

    // console.log(info);
    // console.log(foreign_address);

    return res.status(200).json({
        userInfo: info,
        addressOrigin: foreign_address
    })
}
