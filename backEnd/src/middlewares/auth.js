const authorize = (req, res, next) => {
    if (req.headers['token'] != undefined) {
        try {
            var result = jwt.verify(req.headers['token'], privateKey.token);
            req.body.userToken = result.username;
            req.body.userIdToken = result.citizen_id;
            next();
        } catch (e) {
            return res.status(200).json({ meg: "Token ไม่ถูกต้อง", status: false }).end();
        }
    }
    else {
        return res.status(200).json({ meg: "ไม่พบ Token กรุณาทำการ Login ใหม่ !!", status: false }).end();
    }
}
module.exports = authorize;