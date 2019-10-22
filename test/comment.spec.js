const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Comments Endpoint', function(){
    let db 
    const {
        testUsers,
        testPosts,
        testComments,
    } = helpers.makeCommentsFixtures()
    
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

    describe(`GET /api/comment`,()=> {
        context(`Given no comment`,()=>{
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                  .get('/api/comments')
                  .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                  .expect(200, [])
                })
            })
        context(`Given there are comment in the database`,()=>{
            beforeEach('insert comment', () =>
                helpers.seedCommentsTables(
                db,
                testUsers,
                testComments,
                testPosts
                )
            )
            it(`responds with 200 and a list object`, () => {
                const expectedComments = testComments.map(comment =>
                    helpers.makeExpectedcomment(
                      testUsers,
                      testPosts,
                      comment,
                    )
                  )
                return supertest(app)
                    .get('/api/comment')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
                    .expect(200, expectedComments)
                })
            })

    })
})