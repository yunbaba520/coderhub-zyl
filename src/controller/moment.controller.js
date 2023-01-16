const { MOMENT_IMG_PATH } = require("../config/path.config");
const {SERVER_PORT,SERVER_HOST} = require('../config/server.config')
const momentService = require("../service/moment.service");
const fs = require('fs')
class MomentController {
    // 发表动态，带配图，带labels
    async createMoment(ctx,next) {
        // 获取用户id与发布的评论，相关label
        const {content,labels} = ctx.request.body
        // console.log(labels);
        const {id} = ctx.user
        // 配图列表
        // console.log(ctx.request.files);
        const pictures = ctx.request.files
        // 将数据保存到数据库
        
        const res = await momentService.create(content,id)
        const momentId = res.insertId
        for (const label of labels) {
            await momentService.saveLabel(momentId,label)
        }
        
        // 保存图片
        for (const file of pictures) {
            const {filename,originalname,mimetype,size} = file
            const res = await momentService.savePicture(filename,originalname,mimetype,size,momentId)
            // 保存picture的url
            const pictureId = res.insertId
            const pictureUrl = `${SERVER_HOST}:${SERVER_PORT}/moment/picture/${pictureId}`
            await momentService.savePictureUrlById(pictureId,pictureUrl)
        }
        ctx.body = {
            code: 0,
            message: '发布动态成功'
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
        const pictures = ctx.request.files
        // 修改数据库
        // 修改moment
        await momentService.update(momentId,content)
        // 删除以前所有动态相关标签，关系表
        await momentService.deletelabelById(momentId)
        // 加入新的关系
        for (const label of labels) {
            await momentService.saveLabel(momentId,label)
        }
        // 删除以前动态的所有配图
        await momentService.deletePictureById(momentId)
        // 加入新的图片
        for (const file of pictures) {
            const {filename,originalname,mimetype,size} = file
            const res = await momentService.savePicture(filename,originalname,mimetype,size,momentId)
            // 保存picture的url
            const pictureId = res.insertId
            const pictureUrl = `${SERVER_HOST}:${SERVER_PORT}/moment/picture/${pictureId}`
            await momentService.savePictureUrlById(pictureId,pictureUrl)
        }
        ctx.body = {
            code: 0,
            message: "修改动态成功"
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
    // 查看配图
    async showPicture(ctx,next) {
        const {pictureId} = ctx.params
        // 查询数据库
        const {filename,mimetype} = await momentService.getPictureById(pictureId)
        // 根据信息读取文件
        ctx.type = mimetype
        // ctx.body可以接受stream流
        ctx.body = fs.createReadStream(`${MOMENT_IMG_PATH}/${filename}`)
    }
}
module.exports = new MomentController()