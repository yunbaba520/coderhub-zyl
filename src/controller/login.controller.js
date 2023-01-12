const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct.config')
class LoginController {
    sign(ctx,next) {
        // 验证通过，颁发令牌
        const {id,name} = ctx.user
        let token = ''
        try {
            token = jwt.sign({id, name}, PRIVATE_KEY, {
                expiresIn: 24 * 60 * 60,
                algorithm: 'RS256'
            })
        } catch (error) {
            console.log(error);
        } 
        ctx.body = {
            code: 0,
            data:{
                id,
                name,
                token
            }
        }
    }
}

module.exports = new LoginController()