module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.SECRET || 'secreto'
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'RLgNJF8hIB',
        password: process.env.MYSQL_PASSWORD || 'xKoanJlCro',
        database: process.env.MYSQL_DATABASE || 'RLgNJF8hIB',
        port: process.env.MYSQL_PORT || '3306',
    }
}