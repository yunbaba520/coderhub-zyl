const Koa = require('koa')
const userRouter = require('../router/users.router')
const loginRouter = require('../router/login.router')
const bodyparser = require('koa-bodyparser')
const app = new Koa()

// 使用第三方库解析json数据
app.use(bodyparser())
// 路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

module.exports = app
