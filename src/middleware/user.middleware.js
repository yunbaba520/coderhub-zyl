const userService = require('../service/user.service')
// 中间件
const verifyUser = async (ctx,next)=>{
    // 判断name,password是否合规，数据库中name是否存在
    const {name,password} = ctx.request.body
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
    await next()
}

module.exports = {
    verifyUser
}