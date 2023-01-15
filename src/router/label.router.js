const KoaRouter = require('@koa/router')
const labelController = require('../controller/label.controller')
const { verifyToken } = require('../middleware/login.middleware')
const labelRouter = new KoaRouter({
    prefix: '/label'
})
// 创建用户标签,需要登录
labelRouter.post('/',verifyToken,labelController.create)
// 获取标签列表
labelRouter.post('/list',labelController.queryList)
module.exports = labelRouter