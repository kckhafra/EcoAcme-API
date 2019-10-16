const bcrypt = require('bcryptjs') 

const UserService = {
    hasUserWithUserName(db, user_name){
        return db('ecoacme_users')
        .where({user_name})
        .first()
        .then(user=>!!user)
    },
    getAllUsers(db){
        return db
        .from('ecoacme_users')
        .select('*')

    },
    getUserById(db,user_id){
        return db
        .from ('ecoacme_users')
        .select('*')
        .where('id',user_id)
    },
    postUser(db,user){
        return db
        .insert(user)
        .into('ecoacme_users')
        .returning('*')
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
      },
    validatePassword(password) {
        if (password.length < 8) {
          return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
          return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
          }
      },
      updateUser(db,userId,updateAbout){
        return db
        .from('ecoacme_users')
        .where('id',userId)
        .update(updateAbout)
        .returning("*")

      }
}
module.exports = UserService