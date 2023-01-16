const multer = require('@koa/multer')
const { USER_AVATAR_PATH,MOMENT_IMG_PATH } = require('../config/path.config')
// 这个./文件夹与项目启动目录有关
// 头像，单文件
const avatarMulter = multer({
    dest: USER_AVATAR_PATH
})
// 动态配图，多文件0-9
const pictureMulter = multer({
    dest: MOMENT_IMG_PATH
})

const avatarUpload = avatarMulter.single('avatar')
const pictureUpload = pictureMulter.array('picture')
module.exports = {
    avatarUpload,
    pictureUpload
}