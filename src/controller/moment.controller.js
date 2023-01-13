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
    async queryDetail(ctx, next) {
        const momentId = ctx.params.momentId
        const res = await momentService.queryDetail(momentId)
        ctx.body = {
            code: 0,
            message: '获取详情成功',
            data: res[0]
        }
    }
    async update(ctx, next) {
        // 获取动态id及修改内容
        const {momentId} = ctx.params
        const {content} = ctx.request.body
        console.log(momentId,content);
        // 修改数据库
        const res = await momentService.update(momentId,content)
        ctx.body = {
            code: 0,
            message: "修改动态成功",
            data: res
        }
    }
    async remove(ctx,next) {
        // 获取momentId
        const {momentId} = ctx.params
        // 操作数据库
        const res = await momentService.remove(momentId)
        ctx.body = {
            code: 0,
            message: '删除动态成功',
            data: res
        }
    }
}
module.exports = new MomentController()