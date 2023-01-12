const { USER_NAME_AND_PASSWORD_IS_NOT_NULL, USER_NAME_IS_NOT_EXISTS, USER_PASSWORD_IS_ERROR } = require("../config/constant.config");
const { findUserByName } = require("../service/user.service");
const md5Password = require("../utils/md5-password");

const verifyLogin = async (ctx,next)=>{
    const {name,password} = ctx.request.body
    console.log(name,password);
    // 验证是否为空
    if (!name || !password) {
        return ctx.app.emit('error', USER_NAME_AND_PASSWORD_IS_NOT_NULL, ctx)
    }
    // 验证name是否正确
    const [user] = await findUserByName(name)
    console.log(user);
    if (!user) {
        return ctx.app.emit('error', USER_NAME_IS_NOT_EXISTS, ctx)
    }
    // 验证password是否正确
    if (user.password !== md5Password(password)) {
        return ctx.app.emit('error', USER_PASSWORD_IS_ERROR, ctx)
    }
    // 把user传给下一个中间件处理
    ctx.user = user
    await next()
}

module.exports = {
    verifyLogin
}