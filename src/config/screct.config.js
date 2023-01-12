// private.key，public.key获取命令
/**
 * 1.进入要创建文件夹keys下
 * 2.终端输入openssl
 * 3.genrsa -out private.key 2048
 * 4.rsa -in private.key -pubout -out public.key
 */

const fs = require('fs')
const path = require('path')
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
    PRIVATE_KEY,
    PUBLIC_KEY
}