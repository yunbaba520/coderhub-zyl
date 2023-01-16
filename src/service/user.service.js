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
    // 保存avatar信息
    async saveAvatar(filename,originalname,mimetype,size,userId) {
        const statement = 'INSERT INTO avatar (filename,originalname,mimetype,size,user_id) VALUES (?,?,?,?,?);'
        const [res] = await connection.execute(statement,[filename,originalname,mimetype,size,userId])
        return res
    }
    // 根据userId查找头像
    async getAvatarByUserId(userId) {
        const statement = 'SELECT * FROM avatar WHERE user_id = ?;'
        const [res] = await connection.execute(statement,[userId])
        // 可能上传多次头像，获取最后一个，pop删除最后一个并把值返回
        return res.pop()

    }
    // 在user表保存avatar_url
    async saveAvatarUrl(avatarUrl,userId) {
        const statement = 'UPDATE user SET avatar_url = ? WHERE id = ?;'
        const [res] = await connection.execute(statement,[avatarUrl,userId])
        return res
    }
}

module.exports = new UserService()