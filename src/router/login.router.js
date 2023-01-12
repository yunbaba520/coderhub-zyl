const KoaRouter = require('@koa/router')
const { sign } = require('../controller/login.controller')
const { verifyLogin } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({
    prefix: '/login'
})
// 登录接口
// 1.先验证是否为空，查看name是否存在，查看password是否正确，登录成功颁发令牌
loginRouter.post('/', verifyLogin, sign)

module.exports = loginRouter