const db = require("../data/dbConfig")

module.exports = {
    insert,
    getAll,
    remove
}

 function insert(user) {
    return db("users")
    .insert(user, 'id')
    .then(ids => ids[0])
}

function getAll() {
    return db("users")
}

function remove(id) {
    return db("users")
    .where({id})
    .del()
}