const KoaRouter = require('@koa/router')

// user路由
const userRouter = new KoaRouter({
    prefix: '/users'
})
userRouter.get('/list',(ctx,next)=>{
    ctx.body = 'user list'
})


module.exports = userRouter