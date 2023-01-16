const multer = require('@koa/multer')
// 这个./文件夹与项目启动目录有关
const upload = multer({
    dest: './uploads'
})

const avatarUpload = upload.single('avatar')

module.exports = {
    avatarUpload
}