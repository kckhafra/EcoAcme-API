
const PostService = {
    getAllPost(db){
        return db
        .from('ecoacme_posts')
        .select('id','user_id','post', 'date_created', 'date_modified','images')
    }
}

module.exports = PostService