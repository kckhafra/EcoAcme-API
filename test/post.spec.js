const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Posts Endpoint', function(){
    let db 
    const {
        testUsers,
        testPosts,
    } = helpers.makePostsFixtures()
    
    before('make knex instance', ()=>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', ()=> db.destroy())

    before('cleanup', ()=>helpers.cleanTables(db))

    afterEach('cleanup',()=> helpers.cleanTables(db))

    describe(`GET /api/post`,()=> {
        context(`Given no post`,()=>{
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                  .get('/api/post')
                  .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                  .expect(200, [])
                })
            })
        context(`Given there are post in the database`,()=>{
            beforeEach('insert post', () =>
                helpers.seedPostsTables(
                db,
                testUsers,
                testPosts,
                )
            )
            it(`responds with 200 and a list object`, () => {
                const expectedPosts = testPosts.map(post =>
                    helpers.makeExpectedPost(
                      testUsers,
                      post,
                    )
                  )
                return supertest(app)
                    .get('/api/post')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedPosts)
                })
            })

    })
})