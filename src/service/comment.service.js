const connection = require("../app/database")

class CommentService {
    async create(content,momentId,userId) {
        const statement = 'INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);'
        const [res] = await connection.execute(statement,[content,momentId,userId])
        return res
    }
}

module.exports = new CommentService()