const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.port || 3000,
    hostName: process.env.HOSTNAME || 'localhost',
    dbUser: 'root',
    dbPass: 'kang',
    dbName: 'examination_psu',
}

module.exports = config;