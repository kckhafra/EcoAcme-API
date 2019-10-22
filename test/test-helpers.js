const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeUsersArray() {
    return [
      {
        id: 1,
        first_name: 'Test user 1',
        last_name: 'Test user 1',
        email: 'email1',
        profession: 'prof',
        profession_years: 1,
        user_name: 'test-user-1',
        password: 'password',
        about_me: 'about me',
        college: 'temple',
        degree: 'psychology',
        images: 'http//gkkkeke',
        holistic_services: 'i love people',
        holistic_organizations: 'all of them',
        date_created: new Date('2029-01-22T16:28:32.615Z')
      },
      {
        id: 2,
        first_name: 'Test user 2',
        last_name: 'Test user 2',
        email: 'email2',
        profession: 'prof',
        profession_years: 1,
        user_name: 'test-user-2',
        password: 'password',
        about_me: 'about me',
        college: 'temple',
        degree: 'psychology',
        images: 'http//gkkkeke',
        holistic_services: 'i love people',
        holistic_organizations: 'all of them',
        date_created: new Date('2029-01-22T16:28:32.615Z')
      },
      {
        id: 3,
        first_name: 'Test user 3',
        last_name: 'Test user 3',
        email: 'email3',
        profession: 'prof',
        profession_years: 1,
        user_name: 'test-user-3',
        password: 'password',
        about_me: 'about me',
        college: 'temple',
        degree: 'psychology',
        images: 'http//gkkkeke',
        holistic_services: 'i love people',
        holistic_organizations: 'all of them',
        date_created: new Date('2029-01-22T16:28:32.615Z')
      },
      {
        id: 4,
        first_name: 'Test user 4',
        last_name: 'Test user 4',
        email: 'email4',
        profession: 'prof',
        profession_years: 1,
        user_name: 'test-user-4',
        password: 'password',
        about_me: 'about me',
        college: 'temple',
        degree: 'psychology',
        images: 'http//gkkkeke',
        holistic_services: 'i love people',
        holistic_organizations: 'all of them',
        date_created: new Date('2029-01-22T16:28:32.615Z')
      }
    ]
  }

  function makePostsArray(user){
    return [
      {
        id: 1,
        user_id: user[0].id,
        post: 'post 1',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        date_modified: new Date('2029-01-22T16:28:32.615Z'),
        post_images: 'http//fjfneurne'
      },
      {
        id: 2,
        user_id: user[1].id,
        post: 'post 2',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        date_modified: new Date('2029-01-22T16:28:32.615Z'),
        post_images: 'http//fjfneurne'
      },
      {
        id: 3,
        user_id: user[2].id,
        post: 'post 3',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        date_modified: new Date('2029-01-22T16:28:32.615Z'),
        post_images: 'http//fjfneurne'
      },
    ]
  }

  function makeFriendsArray(){
    return [
      {
        id: 1,
        friend_request_id: 1,
        friend_receiver_id: 2,
      },
      {
        id: 2,
        friend_request_id: 3,
        friend_receiver_id: 2,
      },
      {
        id: 3,
        friend_request_id: 4,
        friend_receiver_id: 1,
      },
    ]
  }
  function makeCommentsArray(user,post){
    return[
      {
        id:1,
        user_id:user[0].id,
        post_id: post[0].id,
        comments:"Cant wait for the festival",
        date_created:"2019-10-16T23:25:26.178Z",
        date_modified:null,
      },
      {
        id:2,
        user_id:user[1].id,
        post_id:post[1].id,
        comments:"I know. I will be there",
        date_created:"2019-10-16T23:25:26.178Z",
        date_modified:null,
        
      },
        {
        id:3,
        user_id:user[2].id,
        post_id:post[2].id,
        comments:"see you there",
        date_created:"2019-10-16T23:25:26.178Z",
        date_modified:null,
      },
        {
        id:4,
        user_id:user[3].id,
        post_id:post[2].id,
        comments:"I want to workout with you. send details",
        date_created:"2019-10-16T23:25:26.178Z",
        date_modified:null,
          },
      
    ]
  }

  function makeMessagesArray(){
    return [
    
        {id:1,
        sender_id:3,
        receiver_id:1,
        messages:"How are you doing today",
        date_created:"2019-10-21T02:15:44.742Z",
       },
        {id:2,
        sender_id:1,
        receiver_id:3,
        messages:"hey",
        date_created:"2019-10-20T16:28:02.303Z",
        },
        {id:3,
        sender_id:1,
        receiver_id:3,
        messages:"hey",
        date_created:"2019-10-20T16:28:02.303Z",
        },
        {id:4,
        sender_id:1,
        receiver_id:2,
        messages:"hey",
        date_created:"2019-10-19T20:34:41.231Z",
        },
        {id:5,
        sender_id:1,
        receiver_id:2,
        messages:"hey",
        date_created:"2019-10-19T20:34:41.231Z",
        },
        {id:6,
        sender_id:6,
        receiver_id:1,
        messages:"hey",
        date_created:"2019-10-17T02:45:44.014Z",
        },
        {id:7,
        sender_id:6,
        receiver_id:1,
        messages:"hey",
        date_created:"2019-10-17T02:45:44.014Z",
        }
    ]
  }
  
  function makeExpectedPost(testUsers, post) {
    const users = testUsers
    .find(user=>user.id===post.user_id)
  return {
    id: post.id,
    user_id: users.id,
    post: post.post,
    date_created: post.date_created.toISOString(),
    post_images: post.post_images,
      first_name: users.first_name,
      last_name: users.last_name,
      images: users.images,
      profession: users.profession,
      
    
  }
}



function makeExpectedComment(testUsers, testPosts, comment) {
  const users = testUsers
  .find(user=>user.id===comment.user_id)
  const posts = testPosts.find(post=>post.id===comment.post_id)
return {
  id: comment.id,
  user_id: users.id,
  post_id: posts.id,
  date_created: comment.date_created.toISOString(),
    first_name: users.first_name,
    last_name: users.last_name,
    images: users.images,
    profession: users.profession,
  
}
}

function makePostsFixtures() {
  const testUsers = makeUsersArray()
  const testPosts = makePostsArray(testUsers)
  return { testUsers, testPosts}
}
function makeCommentsFixtures() {
  const testUsers = makeUsersArray()
  const testPosts = makePostsArray(testUsers)
  const testComments = makeCommentsArray(testUsers,testPosts)
  return { testUsers, testPosts, testComments}
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        ecoacme_users,
        ecoacme_friends,
        ecoacme_posts,
        ecoacme_messages,
        ecoacme_comments
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE ecoacme_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE ecoacme_comments_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE ecoacme_posts_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE ecoacme_messages_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE ecoacme_friends_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('ecoacme_users_id_seq', 0)`),
        trx.raw(`SELECT setval('ecoacme_comments_id_seq', 0)`),
        trx.raw(`SELECT setval('ecoacme_posts_id_seq', 0)`),
        trx.raw(`SELECT setval('ecoacme_messages_id_seq', 0)`),
        trx.raw(`SELECT setval('ecoacme_friends_id_seq', 0)`),
      ])
    )
  )
}
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('ecoacme_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('ecoacme_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}
function seedPostsTables(db, users, posts) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('ecoacme_posts').insert(posts)
    await trx.raw(
      `SELECT setval('ecoacme_posts_id_seq', ?)`,
      [posts[posts.length - 1].id],
    )
  })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, 
      secret, {
          subject: user.user_name,
          algorithm: 'HS256',
  })
  return `Bearer ${token}`
}






function seedCommentsTables(db, users, comments,posts) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await seedPostsTables(trx, users, posts)
    await trx.into('ecoacme_comments').insert(comments)
    await trx.raw(
      `SELECT setval('ecoacme_comments_id_seq', ?)`,
      [comments[comments.length - 1].id],
    )
  })
}


module.exports = {
  makeUsersArray,
  makeMessagesArray,
  makeCommentsArray,
  makePostsArray, 
  makeFriendsArray, 
  makePostsFixtures,
  makeExpectedPost,
  cleanTables,
  makeAuthHeader,
  seedPostsTables,
  makeCommentsFixtures,
  seedCommentsTables,
  seedUsers,
  makeExpectedComment
}