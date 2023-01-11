const { USER_NAME_AND_PASSWORD_IS_NOT_NULL, USER_NAME_IS_EXISTS } = require('../config/constant.config')
const userService = require('../service/user.service')
// 中间件
const verifyUser = async (ctx,next)=>{
    // 判断name,password是否合规，数据库中name是否存在
    const {name,password} = ctx.request.body
    if (!name || !password) {
        return ctx.app.emit('error',USER_NAME_AND_PASSWORD_IS_NOT_NULL,ctx)
    }
    const users = await userService.findUserByName(name)
    if (users.length) {
        return ctx.app.emit('error',USER_NAME_IS_EXISTS,ctx)
    }
    await next()
}

module.exports = {
    verifyUser
}