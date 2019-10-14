const CommentService = {
    getComment(db){
        return db
        .select('ecoacme_comments.*','ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.images','ecoacme_users.profession')
        .from('ecoacme_comments')
        .join('ecoacme_users', function(){
            this.on('ecoacme_comments.user_id','=','ecoacme_users.id')
        })
        .orderBy('date_created', 'desc')
        
        
    },
    getCommentById(db,comm_id){
        return db
        .select('ecoacme_comments.*','ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.images','ecoacme_users.profession')
        .from('ecoacme_comments')
        .where('ecoacme_comments.id',comm_id)
        .join('ecoacme_users', function(){
            this.on('ecoacme_comments.user_id','=','ecoacme_users.id')
        })
        
        
    },
    insertComment(db, newComment) {
        return db
          .insert(newComment)
          .into('ecoacme_comments')

          .returning('*')
          .then(([comment]) => comment)
          
      },
    deleteComment(db, commentId){
        return db
            .from('ecoacme_comments')
            .where('id',commentId)
            .delete()
    },
    updateComment(db,updateComment,id){
        return db
        .from('ecoacme_comments')
        .where({id})
        .update(updateComment)
    }
}

module.exports = CommentService