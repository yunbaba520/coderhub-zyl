const { UNAUTHORITY } = require("../config/constant.config");
const { isMomentAuthority } = require("../service/authority.service");

// 验证有无操作moment权限
const verifyMomentAuthority = async (ctx, next)=>{
    // 获取momentId userId
    const {momentId} = ctx.params
    const {id} = ctx.user
    // 数据库查询
    const isAuthority = await isMomentAuthority(momentId,id)
    if (!isAuthority) {
        return ctx.app.emit('error',UNAUTHORITY,ctx)
    }
    await next()
}

module.exports = {
    verifyMomentAuthority
}