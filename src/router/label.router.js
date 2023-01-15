const KoaRouter = require('@koa/router')
const labelController = require('../controller/label.controller')
const { verifyToken } = require('../middleware/login.middleware')
const labelRouter = new KoaRouter({
    prefix: '/label'
})
// 创建用户标签,需要登录
labelRouter.post('/',verifyToken,labelController.create)
module.exports = labelRouter