const connection = require('../app/database')
class UserService {
    // 操作数据库的相关函数
    create(userInfo) {
        // connection.execute()
        console.log(userInfo);
    }
}

module.exports = new UserService()