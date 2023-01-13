const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyMomentAuthority } = require('../middleware/authority.middleware')
const { verifyToken } = require('../middleware/login.middleware')
const momentRouter = new KoaRouter({
    prefix: '/moment'
})
// 发表动态，需要登录
momentRouter.post('/',verifyToken ,momentController.create)
// 获取动态列表，不需要登录
momentRouter.get('/list',momentController.queryList)
// 获取动态详情，不需要登录
momentRouter.get('/detail/:momentId',momentController.queryDetail)
// 修改动态，需要登录，只能修改自己动态
momentRouter.patch('/update/:momentId',verifyToken,verifyMomentAuthority,momentController.update)
module.exports = momentRouter