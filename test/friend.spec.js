const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Friends Endpoint', function(){
    let db 
    const {
        testFriends,
    } = helpers.makeFriendsFixtures()
    
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

    describe(`GET /api/Friends`,()=> {
        context(`Given no Friends`,()=>{
            beforeEach(() =>
                helpers.seedFriends(db, testFriends)
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                  .get('/api/Friends')
                  .expect(200, [])
                })
            })
        context(`Given there are Friends in the database`,()=>{
            beforeEach('insert Friends', () =>
                helpers.seedFriendsTables(
                db,
                testFriends,
                )
            )
            it(`responds with 200 and a list object`, () => {
                const expectedFriends = testFriends.map(Friends =>
                    helpers.makeExpectedFriends(
                      Friends,
                    )
                  )
                return supertest(app)
                    .get('/api/Friends')
                    .expect(200, expectedFriends)
                })
            })

    })
})