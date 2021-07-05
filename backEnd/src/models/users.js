
const validatedOfCitizenId = async (citizenId) => {
    try {
        const rows = await db.promise().query('SELECT citizen_id '
            + 'FROM users '
            + 'WHERE citizen_id = "' + citizenId + '"'
            + ' limit 1');
        if (rows[0][0] !== undefined) {
            return false
        }
        return true
    } catch (err) {
        throw err
    }
}

const validatedOfPassport = async (passport) => {
    try {
        const rows = await db.promise().query('SELECT passport '
            + 'FROM users '
            + 'WHERE passport = "' + passport + '"'
            + ' limit 1');
        if (rows[0][0] !== undefined) {
            return false
        }
        return true
    } catch (err) {
        throw err
    }
}


const validatedOfPhoneNumber = async (phoneNumber) => {
    try {
        try {
            const rows = await db.promise().query('SELECT phoneNumber '
                + 'FROM users '
                + 'WHERE phoneNumber = "' + phoneNumber + '"'
                + ' limit 1');
            if (rows[0][0] !== undefined) {
                return false
            }
            return true
        } catch (err) {
            throw err
        }
    } catch (err) {

    }
}


const insert = async (userData) => {
    try {
        const rows = await db.promise().query('INSERT INTO users'
            + '(citizen_id,img_cardId,surName,lastName,phoneNumber,vehicle,travelType,province,district,amphures) '
            + 'values("' + userData.citizen_id + '","' + userData.img_cardId + '",'
            + '"' + userData.surName + '","' + userData.lastName + '",'
            + '"' + userData.phoneNumber + '","' + userData.vehicle + '",'
            + '"' + userData.travelType + '","' + userData.province + '",'
            + '' + userData.district + ',' + userData.amphures + ')');
        return true
    } catch (err) {
        throw err
    }
}

const insertForForeign = async (userData) => {
    try {
        const rows = await db.promise().query('INSERT INTO users'
            + '(citizen_id ,passport,img_cardId,surName,lastName,phoneNumber,vehicle,travelType,foreign_address_id,province,district,amphures) '
            + 'values("' + userData.citizen_id + '","' + userData.passport + '","' + userData.img_cardId + '",'
            + '"' + userData.surName + '","' + userData.lastName + '",'
            + '"' + userData.phoneNumber + '","' + userData.vehicle + '",'
            + '"' + userData.travelType + '",' + userData.addressId + ','
            + '' + userData.province + ',' + userData.district + ',' + userData.subDistrict + ')');
        return true
    } catch (err) {
        throw err
    }
}


const getNewUsersToday = async () => {
    try {
        let today = fn.getDateToday();
        const rows = await db.promise().query('SELECT citizen_id,surName , lastName,travelType,createdAt,phoneNumber '
            + 'FROM users '
            + 'WHERE createdAt like "' + today + '%" '
            + 'ORDER BY createdAt DESC '
            + 'LIMIT 15');
        return rows[0]
    } catch (err) {
        throw err
    }
}

const getUserBySQL = async (sql) => {
    try {
        const rows = await db.promise().query(sql);
        return rows[0]
    } catch (err) {
        throw err
    }
}

const getUserByCardID = async (cardID) => {
    try {
        const rows = await db.promise().query('SELECT * '
            + 'FROM users '
            + 'WHERE citizen_id = "' + cardID + '" '
            + 'LIMIT 1');
        return rows[0][0]
    } catch (err) {
        throw err
    }
}

const getAddressForeign = async (id) => {
    try {
        const rows = await db.promise().query('SELECT * '
            + 'FROM foreign_address '
            + 'WHERE address_id = ' + id + ' '
            + 'LIMIT 1');
        return rows[0][0]
    } catch (err) {
        throw err
    }
}

const getTypeByCardID = async (cardID) => {
    try {
        const rows = await db.promise().query('SELECT travelType '
            + 'FROM users '
            + 'WHERE citizen_id = "' + cardID + '" '
            + 'LIMIT 1');
        return rows[0][0].travelType
    } catch (err) {
        throw err
    }
}


const getLengthUserNewToday = async () => {
    let today = fn.getDateToday();
    try {
        const rows = await db.promise().query('SELECT citizen_id '
            + 'FROM users '
            + 'WHERE createdAt like "' + today + '%" '
        );
        return rows[0].length
    } catch (err) {
        throw err
    }
}


const getLengthNewTodayInThai = async () => {
    let today = fn.getDateToday();
    try {
        const rows = await db.promise().query('SELECT citizen_id '
            + 'FROM users '
            + 'WHERE createdAt like "' + today + '%" and travelType = "ประเทศไทย"'
        );
        return rows[0].length
    } catch (err) {
        throw err
    }
}

const getLengthNewTodayForeign = async () => {
    let today = fn.getDateToday();
    try {
        const rows = await db.promise().query('SELECT citizen_id '
            + 'FROM users '
            + 'WHERE createdAt like "' + today + '%" and travelType = "ต่างประเทศ"'
        );
        return rows[0].length
    } catch (err) {
        throw err
    }
}


module.exports = {
    validatedOfCitizenId,
    validatedOfPassport,
    validatedOfPhoneNumber,
    insert,
    insertForForeign,
    getNewUsersToday,
    getUserBySQL,
    getUserByCardID,
    getTypeByCardID,
    getAddressForeign,
    getLengthUserNewToday,
    getLengthNewTodayInThai,
    getLengthNewTodayForeign
}