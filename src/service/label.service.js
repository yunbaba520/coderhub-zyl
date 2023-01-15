const connection = require("../app/database")

class LabelService {
    async create(name) {
        const statement = 'INSERT INTO label (name) VALUES (?);'
        const [res] = await connection.execute(statement,[name])
        return res
    }
}

module.exports = new LabelService()