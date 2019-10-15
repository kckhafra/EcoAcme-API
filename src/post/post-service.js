
const PostService = {
    getAllPost(db){
        return db
        .from('ecoacme_posts')
        // .select('*')
        .select('ecoacme_posts.id','ecoacme_posts.user_id','ecoacme_posts.post', 'ecoacme_posts.date_created','ecoacme_posts.post_images', 'ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.images','ecoacme_users.profession')
        .join('ecoacme_users', function(){
            this.on('ecoacme_posts.user_id','=','ecoacme_users.id')
        })
        .orderBy('ecoacme_posts.date_created', 'desc')
    },
    getPostById(db,postId){
        return db
        .from('ecoacme_posts')
        // .select('*')
        .select('ecoacme_posts.id','ecoacme_posts.user_id','ecoacme_posts.post', 'ecoacme_posts.date_created','ecoacme_posts.post_images', 'ecoacme_users.first_name','ecoacme_users.last_name','ecoacme_users.images','ecoacme_users.profession')
        .join('ecoacme_users', function(){
            this.on('ecoacme_posts.user_id','=','ecoacme_users.id')
        })
        .where('ecoacme_posts.id',postId)
        .orderBy('ecoacme_posts.date_created', 'desc')
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
        .returning('*')
    },
    updatePost(db,id,updatePost){
        return db
        .from('ecoacme_posts')
        .where({id})
        .update(updatePost)
        .returning("*")
    }
}

module.exports = PostService