const CommentService = {
    getComment(db){
        return db
        .select('*')
        .from('ecoacme_comments')
        
    },
    getCommentByPostId(db,post_id){
        return db
        .select('*')
        .from('ecoacme_comments')
        .where('post_id',post_id)
    },
    insertComment(db, newComment) {
        return db
          .insert(newComment)
          .into('ecoacme_comments')
          .returning('*')
          .then(([comment]) => comment)
          
      },
}

module.exports = CommentService