const momentService = require("../service/moment.service");

class MomentController {
    async create(ctx, next) {
        // 获取用户id与发布的评论
        const {content} = ctx.request.body
        const {id} = ctx.user
        // 将数据保存到数据库
        const res = await momentService.create(content,id)
        ctx.body = {
            code: 0,
            message: '发布成功',
            data: res
        }
    }
    async queryList(ctx, next) {
        // 分页参数
        const {offset, size} = ctx.query
        const res = await momentService.queryList(offset,size)
        ctx.body = {
            code: 0,
            message: '获取动态列表成功',
            data: res
        }
    }
}
module.exports = new MomentController()