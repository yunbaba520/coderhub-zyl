const userService = require('../service/user.service')

class UserController {
    create(ctx, next) {
        // 获取用户传递信息
        // 操作数据库
        userService.create('用户信息')
        // 返回结果
        ctx.body = '返回结果'
    }
}

module.exports = new UserController()