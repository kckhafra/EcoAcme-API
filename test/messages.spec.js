const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Messages Endpoint', function(){
    let db 
    const {
        testMessages,
        testUsers
    } = helpers.makeMessagesFixtures()
    
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

    describe(`GET /api/Messages`,()=> {
        context(`Given no Messages`,()=>{
            beforeEach(() =>
                helpers.seedMessages(db, testMessages)
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                  .get('/api/Messages')
                  .expect(200, [])
                })
            })
        context(`Given there are Messages in the database`,()=>{
            beforeEach('insert Messages', () =>
                helpers.seedMessagesTables(
                db,
                testMessages,
                )
            )
            it(`responds with 200 and a list object`, () => {
                const expectedMessages = testMessages.map(Messages =>
                    helpers.makeExpectedMessages(
                      Messages,
                    )
                  )
                return supertest(app)
                    .get('/api/Messages')
                    .expect(200, expectedMessages)
                })
            })

    })
})