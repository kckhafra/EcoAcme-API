const UserService = {
    getAllUsers(db){
        return db
        .from('ecoacme_users')
        .select('*')
        
    },
}
module.exports = UserService