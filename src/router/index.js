const fs = require('fs')
function registryRouters(app) {
    // 1.读取当前文件夹下所以文件
    const files = fs.readdirSync(__dirname)
    // 2.遍历所有文件注册
    for (const file of files) {
        if(!file.endsWith('.router.js')) continue
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    }
}

module.exports = registryRouters