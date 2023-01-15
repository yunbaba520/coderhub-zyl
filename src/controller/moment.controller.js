const momentService = require("../service/moment.service");

class MomentController {
    async create(ctx, next) {
        // 获取用户id与发布的评论，相关label
        const {content,labels} = ctx.request.body
        const {id} = ctx.user
        // console.log(content,labels,id);
        // 将数据保存到数据库
        const res = await momentService.create(content,id)
        const momentId = res.insertId
        for (const label of labels) {
            const resLabel = await momentService.saveLabel(momentId,label)
        }
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
        const {content,labels} = ctx.request.body
        console.log(momentId,content,labels);
        // 修改数据库
        // 修改moment
        const res = await momentService.update(momentId,content)
        // 删除以前所有动态相关标签，关系表
        await momentService.deletelabelById(momentId)
        // 加入新的关系
        for (const label of labels) {
            await momentService.saveLabel(momentId,label)
        }
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