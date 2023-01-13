const connection = require('../app/database')
class MomentService {
    // 操作数据库的相关函数
    async create(content,id) {
        const statement = 'INSERT INTO `moment` (content,user_id) VALUES (?,?);'
        const [res] = await connection.execute(statement,[content,id])
        return res
    }
    async queryList(offset = 0,size = 10) {
        const statement = `
            SELECT 
                m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
                JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt,'updateAt',u.updateAt) user
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
                JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt,'updateAt',u.updateAt) user
            FROM moment m
            LEFT JOIN user u
            ON u.id = m.user_id
            WHERE m.id = ?
        `
        const [values] = await connection.execute(statement,[momentId])
        return values
    }
}

module.exports = new MomentService()