const addressModel = require('./../models/address');

module.exports.provinces = async (req, res) => {
    let provinces = await addressModel.provinces();
    return res.status(200).json({
        data: provinces
    })
}

module.exports.amphures = async (req, res) => {
    let provinces = await addressModel.amphures(req.body.provinceId);
    return res.status(200).json({
        data: provinces
    })
}

module.exports.districts = async (req, res) => {
    let provinces = await addressModel.districts(req.body.amphureId);
    return res.status(200).json({
        data: provinces
    })
}


