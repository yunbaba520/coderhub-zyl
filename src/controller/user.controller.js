const userService = require('../service/user.service')
const {USER_AVATAR_PATH} = require('../config/path.config')
const {SERVER_PORT,SERVER_HOST} = require('../config/server.config')
const fs = require('fs')
class UserController {
    async create(ctx, next) {
        // 1.获取用户传递信息
        const userInfo = ctx.request.body
        
        // 3.操作数据库
        const res = await userService.create(userInfo)
        // 4.返回结果
        ctx.body = {
            message: '创建用户成功~',
            data: res
        }
    }
    async uploadAvatar(ctx, next) {
        // 获取上传文件的信息
        const {filename,originalname,mimetype,size} = ctx.request.file
        const {id} = ctx.user
        // 操作数据库
        await userService.saveAvatar(filename,originalname,mimetype,size,id)
        const avatarUrlTemp = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
        await userService.saveAvatarUrl(avatarUrlTemp,id)
        ctx.body = {
            code: 0,
            message: "头像上传成功",
            data: avatarUrlTemp
        }
    }
    async showAvatar(ctx, next) {
        // 获取userId
        const {userId} = ctx.params
        // 查询数据库
        const {filename,mimetype} = await userService.getAvatarByUserId(userId)
        // 根据信息读取文件
        ctx.type = mimetype
        // ctx.body可以接受stream流
        ctx.body = fs.createReadStream(`${USER_AVATAR_PATH}/${filename}`)
    }
}

module.exports = new UserController()