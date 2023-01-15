const labelService = require("../service/label.service")

class LabelController {
    // 创建标签
    async create(ctx,next) {
        // 获取参数
        const {name} = ctx.request.body
        // 操作数据库
        const res = await labelService.create(name)
        ctx.body = {
            code: 0,
            message: '标签创建成功',
            data: res
        }
    }
    // 标签列表
    async queryList(ctx,next) {
        // 获取参数
        const {offset,size,name} = ctx.request.body
        console.log(offset,size,name);
        // 操作数据库
        const res = await labelService.queryList(name,offset,size)
        ctx.body = {
            code: 0,
            message: '查询标签列表成功',
            data: res
        }
    }
}

module.exports = new LabelController()