const app = require('./app/index.js')
const {SERVER_PORT} = require('./config/server.config')
require('./utils/handle-error')

app.listen(SERVER_PORT,()=>{
    console.log("服务器启动成功~");
})