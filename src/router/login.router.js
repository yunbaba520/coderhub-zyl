const KoaRouter = require('@koa/router')
const { sign, testToken } = require('../controller/login.controller')
const { verifyLogin, verifyToken } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({
    prefix: '/login'
})
// 登录接口
// 1.先验证是否为空，查看name是否存在，查看password是否正确，登录成功颁发令牌
loginRouter.post('/', verifyLogin, sign)
// 测试接口，验证token
loginRouter.get('/test',verifyToken ,testToken)
module.exports = loginRouter