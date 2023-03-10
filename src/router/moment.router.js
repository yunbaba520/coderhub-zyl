const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyAuthority } = require('../middleware/authority.middleware')
const { pictureUpload } = require('../middleware/file.middleware')
const { verifyToken } = require('../middleware/login.middleware')
const momentRouter = new KoaRouter({
    prefix: '/moment'
})
// 发表动态，需要登录,处理图片
momentRouter.post('/',verifyToken, pictureUpload ,momentController.createMoment)
// 获取动态列表，不需要登录
momentRouter.get('/list',momentController.queryList)
// 获取动态详情，不需要登录
momentRouter.get('/detail/:momentId',momentController.queryDetail)
// 修改动态，需要登录，只能修改自己动态
momentRouter.patch('/update/:momentId',verifyToken,verifyAuthority,pictureUpload,momentController.update)
// 删除动态,需要登录，只能删除自己动态
momentRouter.delete('/delete/:momentId',verifyToken,verifyAuthority,momentController.remove)
// 查看配图
momentRouter.get('/picture/:pictureId',momentController.showPicture)

module.exports = momentRouter