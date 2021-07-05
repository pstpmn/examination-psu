const insertAndFind = async (userData) => {
    
    try {
        const rows = await db.promise().query('INSERT INTO foreign_address'
            + '(subDistrict,district,province,country) '
            + 'values("' + userData.subDistrictEn + '","' + userData.districtEn + '",'
            + '"' + userData.provinceEn + '","' + userData.country + '");');
        const id = await db.promise().query('SELECT address_id '
            + 'FROM foreign_address '
            + 'ORDER BY address_id DESC '
            + 'limit 1');

        return id[0][0].address_id;
    } catch (err) {
        throw err
    }
}

module.exports = {
    insertAndFind
}