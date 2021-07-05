
const getUsername = async (username) => {
    try {
        const rows = await db.promise().query('SELECT * '
            + 'FROM administrator '
            + 'WHERE username = "' + username + '"'
            + ' limit 1');
        if (rows[0][0] !== undefined) {
            return rows[0][0]
        }
        return false
    } catch (err) {
        throw err
    }
}

const setUpdateToken = async (citizenId, token) => {
    try {
        const today = fn.getDateTimeToday();
        const rows = await db.promise().query('UPDATE administrator '
            + 'set token = "' + token + '" , updatedAt = "' + today + '" '
            + 'WHERE citizen_id = "' + citizenId + '";');
        return true
    } catch (err) {
        throw err
    }
}

const getToken = async (username) => {
    try {
        const rows = await db.promise().query('SELECT token '
            + 'FROM administrator '
            + 'WHERE username = "' + username + '"'
            + ' limit 1');
        if (rows[0][0] !== undefined) {
            return rows[0][0].token
        }
        return false
    } catch (err) {
        throw err
    }
}




module.exports = {
    getUsername,
    setUpdateToken,
    getToken
}