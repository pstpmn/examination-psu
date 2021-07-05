var { check, validationResult } = require('express-validator');


exports.beforeInsertInfo = [
    check('firstName').trim().escape().not().isEmpty().withMessage('ไม่พบ ชื่อ ของคุณ !!'),
    check('lastName').trim().escape().not().isEmpty().withMessage('ไม่พบ นามสกุล ของคุณ !!'),
    check('phoneNumber').trim().escape().not().isEmpty().withMessage('ไม่พบ เบอร์โทรศัพท์ ห้ามว่าง !!')
        .isNumeric().withMessage('เบอร์โทรศัพท์ ต้องเป็นตัวเลขเท่านั้น')
        .isLength({ min: 10, max: 10 }).withMessage('เบอร์โทรศัพท์ ต้องประกอบไปด้วย 10 หลัก!!'),
    check('travelType').trim().escape().not().isEmpty().withMessage('ไม่พบ ประเภทการเดินทาง ของคุณ !!'),
    check('province').trim().escape().not().isEmpty().withMessage('ไม่พบ จังหวัด ของคุณ !!'),
    check('district').trim().escape().not().isEmpty().withMessage('ไม่พบ อำเภอ ของคุณ !!'),
    check('amphur').trim().escape().not().isEmpty().withMessage('ไม่พบ ตำบล ของคุณ !!'),
    check('citizenId').trim().escape().not().isEmpty().withMessage('ไม่พบ รหัสบัตรประชาชน ของคุณ !!')
        .isNumeric().withMessage('รหัสบัตรประชาชน ต้องเป็นตัวเลข เท่านั้น').isLength({ min: 13, max: 13 }).withMessage('รหัสบัตรประชาชน ต้องมี 13 หลัก!!'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.errors[0].msg, status: false }).end();
        }
        if (req.body.province == 0) {
            return res.status(200).json({ errors: 'โปรดเลือกจังหวัด', status: false }).end();
        }
        if (req.file === undefined) {
            return res.status(200).json({ errors: 'โปรดอัพรูปบัตรประชาชน', status: false }).end();
        }
        if (req.body.travelType !== 'ประเทศไทย') {
            if ((req.body.citizenId === undefined && req.body.passport === undefined) || (req.body.citizenId === '' && req.body.passport === '')) {
                return res.status(200).json({ errors: 'รหัสบัตรประชาชน หรือ passport ห้ามว่าง', status: false }).end();
            }
            if (req.body.passport === undefined || req.body.passport === '') {
                return res.status(200).json({ errors: 'ไม่พบข้อมูล passport', status: false }).end();
            }
            if (req.body.country === undefined || req.body.country === '') {
                return res.status(200).json({ errors: 'ไม่พบข้อมูล Country', status: false }).end();
            }
            if (req.body.provinceEn === undefined || req.body.provinceEn === '' || req.body.provinceEn == 0) {
                return res.status(200).json({ errors: 'ไม่พบข้อมูล Province', status: false }).end();
            }
            if (req.body.districtEn === undefined || req.body.districtEn === '' || req.body.districtEn == 0) {
                return res.status(200).json({ errors: 'ไม่พบข้อมูล District ', status: false }).end();
            }
            if (req.body.amphurEn === undefined || req.body.amphurEn === '' || req.body.amphurEn == 0) {
                return res.status(200).json({ errors: 'ไม่พบข้อมูล Sub District', status: false }).end();
            }
        } else {
            if ((req.body.citizenId === undefined) || (req.body.citizenId === '')) {
                return res.status(200).json({ errors: 'รหัสบัตรประชาชน ห้ามว่าง', status: false }).end();
            }
        }
        next();
    }];