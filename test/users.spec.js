const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoint', function(){
    let db 
    const {
        testUsers,
    } = helpers.makeUsersFixtures()
    
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

    describe(`GET /api/users`,()=> {
        context(`Given no users`,()=>{
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                  .get('/api/users')
                  .expect(200, [])
                })
            })
        context(`Given there are users in the database`,()=>{
            beforeEach('insert users', () =>
                helpers.seedUsersTables(
                db,
                testUsers,
                )
            )
            it(`responds with 200 and a list object`, () => {
                const expectedUsers = testUsers.map(users =>
                    helpers.makeExpectedusers(
                      users,
                    )
                  )
                return supertest(app)
                    .get('/api/users')
                    .expect(200, expectedUsers)
                })
            })

    })
})