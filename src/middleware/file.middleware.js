const multer = require('@koa/multer')
const { USER_AVATAR_PATH } = require('../config/path.config')
// 这个./文件夹与项目启动目录有关
const upload = multer({
    dest: USER_AVATAR_PATH
})

const avatarUpload = upload.single('avatar')

module.exports = {
    avatarUpload
}