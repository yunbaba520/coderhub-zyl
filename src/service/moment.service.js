const connection = require('../app/database')
class MomentService {
    // 操作数据库的相关函数
    async create(content,id) {
        const statement = 'INSERT INTO `moment` (content,user_id) VALUES (?,?);'
        const [res] = await connection.execute(statement,[content,id])
        return res
    }
    // 动态保存相关区label
    async saveLabel(momentId,labelId) {
        const statement = 'INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);'
        const [res] = await connection.execute(statement,[momentId,labelId])
        return res
    }
    async queryList(offset = 0,size = 10) {
        const statement = `
            SELECT 
                m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
                JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt,'updateAt',u.updateAt) user,
                (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) commentCount,
                (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
            FROM moment m
            LEFT JOIN user u
            ON u.id = m.user_id
            LIMIT ? OFFSET ?
        `
        const [values] = await connection.execute(statement,[size,offset])

        return values
    }
    async queryDetail(momentId) {
        const statement = `
            SELECT 
                m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
                JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt,'updateAt',u.updateAt) user,
                (
                    SELECT
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id',c.id,
                                'content',c.content,
                                'createAt',c.createAt,
                                'momentId',c.moment_id,
                                'commentId',c.comment_id,
                                'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
                                
                            )
                        )  
                    FROM comment c 
                    LEFT JOIN user cu ON c.user_id = cu.id
                    WHERE c.moment_id = m.id
                ) commentList,
                (
                    SELECT 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id',l.id,
                                'name',l.name
                            )
                        )
                    FROM moment_label ml
                    LEFT JOIN label l ON ml.label_id = l.id
                    WHERE ml.moment_id = m.id
                ) labelList
            FROM moment m
            LEFT JOIN user u ON u.id = m.user_id
            WHERE m.id = ?;
        `
        const [values] = await connection.execute(statement,[momentId])
        return values
    }
    async update(momentId,content) {
        const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
        const [res] = await connection.execute(statement,[content,momentId])
        return res
    }
    // 删除动态all标签
    async deletelabelById(momentId) {
        const statement = 'DELETE FROM moment_label WHERE moment_id = ?;'
        const [res] = await connection.execute(statement,[momentId])
        return res
    }
    async remove(momentId) {
        const statement = 'DELETE FROM moment WHERE id = ?;'
        const [res] = await connection.execute(statement,[momentId])
        return res
    }
}

module.exports = new MomentService()