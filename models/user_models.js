const db = require('../.database/dbConfig');

module.exports = {
   add,
   find,
   findById,
   findBy,
   update
}

function add(user){
  return db('user')
  .insert(user, "id")
  .then(ids => {
      const[id] = ids
      return findById[id]
  })
}

function find(){
  return db('user')
  .select("id", "username", "password")
}

function findById(id){
    return db('user')
    .where({id})
    .first()
}

function findBy(filter){
    return db('user')
    .where(filter)
}

function update(id, user){
    return db('user')
    .where({id})
    .update(user)
    .then(() => {
        return db('user')
        .where({id})
        .first()
    })
}