const provinces = async () => {
    try {
        const rows = await db.promise().query('SELECT id,name_th FROM provinces');
        return rows[0]
    } catch (err) {
        // console.log(err);
        return false;
    }
}

const getProvince = async (id) => {
    try {
        const rows = await db.promise().query('SELECT id,name_th FROM provinces '
            + 'WHERE id = ' + id);
        return rows[0][0]
    } catch (err) {
        // console.log(err);
        return false;
    }
}

const getAmphures = async (id) => {
    try {
        const rows = await db.promise().query('SELECT id,name_th FROM amphures '
            + 'WHERE id = ' + id);
        return rows[0][0]
    } catch (err) {
        // console.log(err);
        return false;
    }
}

const getDistricts = async (id) => {
    try {
        const rows = await db.promise().query('SELECT id,name_th FROM districts '
            + 'WHERE id = ' + id);
        return rows[0][0]
    } catch (err) {
        // console.log(err);
        return false;
    }
}

const amphures = async (provinceId) => {
    try {
        const rows = await db.promise().query('SELECT id,name_th FROM amphures '
            + 'WHERE province_id = ' + provinceId);
        return rows[0]
    } catch (err) {
        // console.log(err);
        return false;
    }
}

const districts = async (amphureId) => {
    try {
        const rows = await db.promise().query('SELECT id,name_th FROM districts '
            + 'WHERE amphure_id = ' + amphureId);
        return rows[0]
    } catch (err) {
        // console.log(err);
        return false;
    }
}

module.exports = {
    provinces,
    amphures,
    districts,
    getProvince,
    getAmphures,
    getDistricts
};