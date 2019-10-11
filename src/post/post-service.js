
const PostService = {
    getAllPost(db){
        return db
        .from('ecoacme_posts')
        .select('id','user_id','post', 'date_created', 'date_modified','images')
        .orderBy('id', 'desc')
    },
    insertPost(db,newPost){
        return db
        .insert(newPost)
        .into('ecoacme_posts')
        .returning('*')
        
    },
    deletePost(db,id){
        return db
        .from('ecoacme_posts')
        .where('id',id)
        .delete()
    },
    updatePost(db,id,updatePost){
        return db
        .from('ecoacme_posts')
        .where({id})
        .update(updatePost)
    }
}

module.exports = PostService