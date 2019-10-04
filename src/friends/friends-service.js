const FriendsService = {
    getAllFriends(db){
        return db
        .select('*')
        .from('ecoacme_friends')
        .join('ecoacme_users', function(){
            this.on('ecoacme_friends.friend_request_id','=','ecoacme_users.id')
        })
    },
    getFriendRequestById(db,user_id){
        return db
        .select('*')
        .from('ecoacme_friends')
        .join('ecoacme_users', function(){
            this.on('ecoacme_friends.friend_receiver_id','=','ecoacme_users.id')
        })
        .where('friend_request_id', user_id)
        
    },
    getFriendReceiverById(db,user_id){
        return db
        .select('*')
        .from('ecoacme_friends')
        .join('ecoacme_users', function(){
            this.on('ecoacme_friends.friend_request_id','=','ecoacme_users.id')
        })
        .where('friend_receiver_id', user_id)
        
    }
}

module.exports = FriendsService