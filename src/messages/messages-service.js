const MessagesService = {
    getAllUserMessages(db,user_id){
        return db
        .select('ecoacme_messages.*','ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.user_name','ecoacme_users.images',
        'ecoacme_users.id')
        .from('ecoacme_messages')
        .join('ecoacme_users', function(){
            this.on('ecoacme_messages.receiver_id','=','ecoacme_users.id')
            this.orOn('ecoacme_messages.sender_id','=','ecoacme_users.id')
        })
        .where('sender_id', user_id)
        .orWhere('receiver_id',user_id)
        .orderBy('date_created', 'desc')
        
        
    },
    getMessagesByConvo(db,user_id,receiver_id){
        return db
        .select('ecoacme_messages.*','ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.user_name','ecoacme_users.images')
        .from('ecoacme_messages')
        .join('ecoacme_users', function(){
            this.on('ecoacme_messages.sender_id','=','ecoacme_users.id')
        })
        .where('sender_id', user_id)
        .andWhere('receiver_id',receiver_id)
        .orWhere('sender_id', receiver_id)
        .andWhere('receiver_id', user_id)
        
        
    },
    postMessage(db,newMessage){
        return db
        .insert(newMessage)
        .into('ecoacme_messages')
        .returning('*')
    }
}

module.exports = MessagesService