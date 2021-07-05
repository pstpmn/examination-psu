const findAll = async () => {
    try {
        const rows = await db.promise().query('SELECT * FROM students');
        return rows[0]
    } catch(err){
        console.log(err);
        return false;
    }
}

const add = async () => {
    try {
        for(let i =0;i<10000;i++){
            const rows = await db.promise().query('insert into students values(null,"kang kang",4)');
        }
        console.log('ssss');
        return true
    } catch(err){
        console.log(err);
        return false;
    }
}


module.exports = {
    findAll,
    add
};