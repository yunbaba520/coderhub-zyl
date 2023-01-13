const app = require('../app/index');
const { 
    USER_NAME_AND_PASSWORD_IS_NOT_NULL,
    USER_NAME_IS_EXISTS,
    USER_NAME_IS_NOT_EXISTS,
    USER_PASSWORD_IS_ERROR,
    UNAUTHORIZATION,
    UNAUTHORITY
} = require('../config/constant.config');
app.on('error',(error,ctx)=>{
    let code = 0
    let message = ''
    switch (error) {
        case USER_NAME_AND_PASSWORD_IS_NOT_NULL:
            code = -1001
            message = '用户名与密码不能为空~'
            break;
        case USER_NAME_IS_EXISTS:
            code = -1002
            message = '用户名已存在~'
            break;
        case USER_NAME_IS_NOT_EXISTS:
            code = -1003
            message = '用户名不存在~'
            break;
        case USER_PASSWORD_IS_ERROR:
            code = -1004
            message = '密码错误~'
            break;
        case UNAUTHORIZATION:
            code = -1005
            message = '无效的token,或token已过期~'
            break;
        case UNAUTHORITY:
            code = -1006
            message = '您没有权利进行此操作~'
            break;
        default:
            break;
    }
    ctx.body = {
        code,
        message
    }
})