const jwt = require('jsonwebtoken')
const { 
    USER_NAME_AND_PASSWORD_IS_NOT_NULL,
    USER_NAME_IS_NOT_EXISTS,
    USER_PASSWORD_IS_ERROR,
    UNAUTHORIZATION
} = require("../config/constant.config");
const { PUBLIC_KEY } = require('../config/screct.config');
const { findUserByName } = require("../service/user.service");
const md5Password = require("../utils/md5-password");

const verifyLogin = async (ctx,next)=>{
    const {name,password} = ctx.request.body
    // 验证是否为空
    if (!name || !password) {
        return ctx.app.emit('error', USER_NAME_AND_PASSWORD_IS_NOT_NULL, ctx)
    }
    // 验证name是否正确
    const [user] = await findUserByName(name)
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
const verifyToken = async (ctx, next) => {
    const authorization = ctx.headers.authorization
    // 没有token
    if (!authorization) {
        return ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }
    const token = authorization.replace('Bearer ','')
    try {
        const res = jwt.verify(token,PUBLIC_KEY,{
            algorithms: ["RS256"]
        })
        ctx.user = res
        await next()
    } catch (error) {
        return ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }

    
}
module.exports = {
    verifyLogin,
    verifyToken
}