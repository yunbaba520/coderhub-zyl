const connection = require("../app/database")

class LabelService {
    async create(name) {
        const statement = 'INSERT INTO label (name) VALUES (?);'
        const [res] = await connection.execute(statement,[name])
        return res
    }
    async queryList(name,offset=0,size=10) {
        const statement = `SELECT * FROM label WHERE name LIKE '%${name}%' LIMIT ? OFFSET ?;`
        const [values] = await connection.execute(statement,[size,offset])

        return values
    }
}

module.exports = new LabelService()