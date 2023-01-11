const userService = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        // 1.获取用户传递信息
        const userInfo = ctx.request.body
        
        // 3.操作数据库
        const res = await userService.create(userInfo)
        // 4.返回结果
        ctx.body = {
            message: '创建用户成功~',
            data: res
        }
    }
}

module.exports = new UserController()