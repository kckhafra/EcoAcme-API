const UserService = {
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
    }
}
module.exports = UserService