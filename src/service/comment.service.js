const connection = require("../app/database")

class CommentService {
    async create(content,momentId,userId) {
        const statement = 'INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);'
        const [res] = await connection.execute(statement,[content,momentId,userId])
        return res
    }
    async reply(content,momentId,commentId,userId) {
        const statement = 'INSERT INTO comment (content,moment_id,comment_id,user_id) VALUES (?,?,?,?);'
        const [res] = await connection.execute(statement,[content,momentId,commentId,userId])
        return res
    }
    async remove(commentId) {
        const statement = 'DELETE FROM comment WHERE id = ?;'
        const [res] = await connection.execute(statement,[commentId])
        return res
    }
}

module.exports = new CommentService()