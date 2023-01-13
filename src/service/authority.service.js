const connection = require("../app/database")

class AuthorityService {
    async isAuthority(resourceTableName,resourceId,userId) {
        const statement = `SELECT * FROM ${resourceTableName} WHERE id = ? AND user_id = ?;`
        const [values] = await connection.execute(statement,[resourceId,userId])
        return !!values.length
    }
}

module.exports = new AuthorityService()