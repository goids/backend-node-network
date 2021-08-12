module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    posts: {
        port: process.env.POSTS_PORT || '3002'
    },
    jwt: {
        secret: process.env.SECRET || 'secreto'
    },
    mysql:{
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || '',
        port: process.env.MYSQL_PORT || '3306',
    },
    mysql_service:{
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || '3001',
    },
    cache_service:{
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.CACHE_SERVICE_PORT || '3004'
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-16702.c51.ap-southeast-2-1.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || '16702',
        password: process.env.REDIS_PASSWORD || 'fWSfg2GRQdhy2z77xVaxgPfjoPTnsqlU'
    }
}