const { UNAUTHORITY } = require("../config/constant.config");
const { isAuthority } = require("../service/authority.service");

// 验证有无操作moment权限
// const verifyMomentAuthority = async (ctx, next)=>{
//     // 获取momentId userId
//     const {momentId} = ctx.params
//     const {id} = ctx.user
//     // 数据库查询
//     const isAuthority = await isMomentAuthority(momentId,id)
//     if (!isAuthority) {
//         return ctx.app.emit('error',UNAUTHORITY,ctx)
//     }
//     await next()
// }
// 更加通用函数
const verifyAuthority = async (ctx, next)=>{
    // 获取要操作的表，比如momentId=>moment
    const keyName = Object.keys(ctx.params)[0]
    const resourceTableName = keyName.replace('Id','')
    const resourceId = ctx.params[keyName]
    console.log(resourceTableName,resourceId);
    // 获取 userId
    const {id} = ctx.user
    // 数据库查询
    const isHaveAuthority = await isAuthority(resourceTableName,resourceId,id)
    if (!isHaveAuthority) {
        return ctx.app.emit('error',UNAUTHORITY,ctx)
    }
    await next()
}

module.exports = {
    verifyAuthority
}