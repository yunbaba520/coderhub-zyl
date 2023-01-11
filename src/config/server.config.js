// 使.env文件加载
const dotenv = require('dotenv')
dotenv.config()
// 从process.env导入再导出
module.exports = {
    SERVER_PORT
} = process.env