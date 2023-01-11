const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const {verifyUser,handlePassword} = require('../middleware/user.middleware')
// user路由
const userRouter = new KoaRouter({
    prefix: '/users'
})
// 路由映射，把相关操作抽取到controller中
userRouter.post('/list',verifyUser,handlePassword,userController.create)


module.exports = userRouter