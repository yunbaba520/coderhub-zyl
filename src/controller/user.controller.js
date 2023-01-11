const userService = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        // 1.获取用户传递信息
        const userInfo = ctx.request.body
        // 2.判断name,password是否合规，数据库中name是否存在
        const {name,password} = userInfo
        if (!name || !password) {
            ctx.body = {
                code: -1001,
                message: '用户名与密码不能为空~'
            }
            return
        }
        const users = await userService.findUserByName(name)
        if (users.length) {
            ctx.body = {
                code: -1002,
                message: '用户名已存在~'
            }
            return
        }
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