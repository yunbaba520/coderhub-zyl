const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
// user路由
const userRouter = new KoaRouter({
    prefix: '/users'
})
userRouter.get('/list',userController.create)


module.exports = userRouter