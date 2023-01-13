const KoaRouter = require('@koa/router')
const commentController = require('../controller/comment.controller')
const { verifyToken } = require('../middleware/login.middleware')
const { verifyAuthority } = require('../middleware/authority.middleware')
const commentRouter = new KoaRouter({
    prefix:'/comment'
})
// 发表评论，需要登录
commentRouter.post('/',verifyToken,commentController.create)
// 回复评论，需要登录
commentRouter.post('/reply',verifyToken,commentController.reply)
// 删除评论，需要登录，只能删除自己评论
commentRouter.delete('/:commentId',verifyToken,verifyAuthority,commentController.remove)
module.exports = commentRouter





