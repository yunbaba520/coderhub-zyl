const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const registryRouters = require('../router/index')
const app = new Koa()

// 使用第三方库解析json数据
app.use(bodyparser())
// 路由
// 自动化脚本注册
registryRouters(app)
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())


module.exports = app
