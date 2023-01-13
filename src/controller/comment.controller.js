const commentService = require("../service/comment.service");

class CommentController {
    // 发布评论
    async create(ctx,next) {
        // 获取评论content与评论动态id
        const {content,momentId} = ctx.request.body
        // 获取评论user
        const {id} = ctx.user
        // 操作数据库
        const res = await commentService.create(content,momentId,id)
        ctx.body = {
            code: 0,
            message: '发布评论成功',
            data: res
        }
    }
    // 回复评论
    async reply(ctx,next) {
        // 获取评论content，动态id，评论id
        const {content,momentId,commentId} = ctx.request.body
        // 获取评论user
        const {id} = ctx.user
        // 操作数据库
        const res = await commentService.reply(content,momentId,commentId,id)
        ctx.body = {
            code: 0,
            message: '回复评论成功',
            data: res
        }
    }
}

module.exports = new CommentController()