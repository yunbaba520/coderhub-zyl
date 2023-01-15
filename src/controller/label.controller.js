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
}

module.exports = new LabelController()