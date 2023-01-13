const connection = require("../app/database")

class AuthorityService {
    async isMomentAuthority(momentId,userId) {
        const statement = 'SELECT * FROM moment WHERE id = ? AND user_id = ?;'
        const [values] = await connection.execute(statement,[momentId,userId])
        return !!values.length
    }
}

module.exports = new AuthorityService()