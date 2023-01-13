const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyToken } = require('../middleware/login.middleware')
const momentRouter = new KoaRouter({
    prefix: '/moment'
})
// 发表动态，需要登录
momentRouter.post('/',verifyToken ,momentController.create)
// 获取动态列表，不需要登录
momentRouter.get('/list',momentController.queryList)
module.exports = momentRouter