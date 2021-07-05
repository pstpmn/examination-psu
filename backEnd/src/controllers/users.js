const usersModel = require('./../models/users');
const foreignModel = require('./../models/foreign_address');

module.exports.insertInfo = async (req, res) => {
    if (req.body.provinceEn == '0' || req.body.provinceEn == 0 || req.body.provinceEn == '') {
        return res.status(200).json({ errors: 'จังหวัดต้นทาง ห้ามว่าง !!', status: false })
    }
    if (req.body.districtEn == '0' || req.body.districtEn == 0 || req.body.districtEn == '') {
        return res.status(200).json({ errors: 'อำเภอ ห้ามว่าง !!', status: false })
    }
    if (req.body.amphurEn == '0' || req.body.amphurEn == 0 || req.body.amphurEn == '') {
        return res.status(200).json({ errors: 'ตำบล ห้ามว่าง !!', status: false })
    }
    let isHadCitizenId;
    let isHadPassport;
    let isHadPhoneNumber;
    let isThailand = false;
    // checking --------------------------------------
    if (req.body.passport !== '') {
        isThailand = false;
        isHadPassport = await usersModel.validatedOfPassport(req.body.passport);
        isHadCitizenId = await usersModel.validatedOfCitizenId(req.body.citizenId);
        if (isHadPassport === false) return res.status(200).json({ errors: 'Passport มีในระบบแล้ว !!', status: false })
    }
    isHadCitizenId = await usersModel.validatedOfCitizenId(req.body.citizenId);
    if (isHadCitizenId === false) return res.status(200).json({ errors: 'Citizen ID มีในระบบแล้ว !!', status: false })

    isHadPhoneNumber = await usersModel.validatedOfPhoneNumber(req.body.phoneNumber);
    if (isHadPhoneNumber === false) return res.status(200).json({ errors: 'Phone Number มีในระบบแล้ว !!', status: false })
    // ----------------------------------------------

    if (isThailand === true) {
        let userArray = {
            citizen_id: req.body.citizenId,
            img_cardId: req.file.filename,
            surName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            travelType: req.body.travelType,
            vehicle: req.body.vehicle,
            province: req.body.province,
            district: req.body.district,
            amphures: req.body.amphur,
        }
        await usersModel.insert(userArray)
    } else {
        let userArray = {
            citizen_id: req.body.citizenId,
            passport: req.body.passport,
            img_cardId: req.file.filename,
            surName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            travelType: req.body.travelType,
            vehicle: req.body.vehicle,
            province: req.body.province,
            district: req.body.district,
            subDistrict: req.body.amphur,

            provinceEn: req.body.provinceEn,
            districtEn: req.body.amphurEn,
            subDistrictEn: req.body.districtEn,
            country: req.body.country
        }
        let addressId = await foreignModel.insertAndFind(userArray);
        userArray.addressId = addressId;
        await usersModel.insertForForeign(userArray)

    }

    return res.status(200).json({
        status: true
    })
}

module.exports.index = async (req, res) => {
    //select users New today

}


