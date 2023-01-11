// node内置库crypto
const crypto = require('crypto')

function md5Password (password) {
    const md5 = crypto.createHash('md5')
    // 用update对password进行更新，并digest转为16进制
    const md5Pwd =  md5.update(password).digest('hex')
    return md5Pwd
}

module.exports = md5Password