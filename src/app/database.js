// 建立与数据库的链接
const mysql = require('mysql2')
// 1.创建连接池
const connectionPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1224251xX@',
    database: 'coderhub_db',
    connectionLimit: 5
})
// 2.查看是否链接成功
connectionPool.getConnection((err,connection)=>{
    if (err) {
        console.log('获取连接失败~',err);
        return
    }
    // 尝试与数据库连接
    connection.connect((err)=>{
        if(err) {
            console.log('与数据库连接失败~',err);
            return
        } else {
            console.log('与数据库连接成功~');
        }
    })
})
// 3.获取连接池中连接对象(promise)
const connection = connectionPool.promise()

module.exports = connection