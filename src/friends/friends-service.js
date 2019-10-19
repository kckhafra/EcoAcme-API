const FriendsService = {
    getAllFriends(db,user_id){
        return db
        .select('ecoacme_friends.*', 'ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.user_name','ecoacme_users.profession','ecoacme_users.images')
        .from('ecoacme_friends')
        .join('ecoacme_users', function(){
            this.on('ecoacme_friends.friend_request_id','=','ecoacme_users.id')
            this.orOn('ecoacme_friends.friend_receiver_id','=','ecoacme_users.id')
        })
        .where('friend_request_id',user_id)
        .orWhere('friend_receiver_id',user_id)
    },
    searchFriends(db,user_id,searchTerm){
        return db
        .select('ecoacme_friends.*', 'ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.user_name','ecoacme_users.profession','ecoacme_users.images')
        .from('ecoacme_friends')
        .join('ecoacme_users', function(){
            this.on('ecoacme_friends.friend_request_id','=','ecoacme_users.id')
            this.orOn('ecoacme_friends.friend_receiver_id','=','ecoacme_users.id')
        })
        .where('friend_request_id',user_id)
        .orWhere('friend_receiver_id',user_id)
        .andWhere('ecoacme_users.first_name',searchTerm)
        
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
        
    },
    postFriends(db,friendMatch){
        return db
        .insert(friendMatch)
        .into('ecoacme_friends')
    },
    deleteFriend(db, requestId,receiverId){
        return db
        .from('ecoacme_friends')
        .where('friend_request_id',requestId)
        .andWhere('friend_receiver_id',receiverId)
        .orWhere('friend_request_id',receiverId)
        .andWhere('friend_receiver_id', requestId)
        .delete()
    },
}

module.exports = FriendsService