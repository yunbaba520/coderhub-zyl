const connection = require('../app/database')
class UserService {
    // 操作数据库的相关函数
    // 注册用户
    async create(userInfo) {
        // 获取用户信息
        const { name, password } = userInfo
        // 拼接sql执行语句
        const statement = 'INSERT INTO `user` (name,password) VALUES (?,?);'
        // 执行,异步操作promise
        const [res] = await connection.execute(statement, [name,password])
        return res
    }
    // 根据name查找用户
    async findUserByName(name) {
        const statement = 'SELECT * FROM `user` WHERE name = ?;'
        const [values] = await connection.execute(statement, [name])
        return values
    }
}

module.exports = new UserService()