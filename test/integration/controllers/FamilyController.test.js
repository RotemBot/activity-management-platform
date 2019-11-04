// test/integration/controllers/UserController.test.js
var supertest = require('supertest')
var expect = require('chai').expect

const context = {
    name: 'Israeli',
    homeTown: 'Otniel',
    email: (index) => `israeli${index}@test.com`
}

describe.only('FamilyController', () => {

    describe('create', () => {
        it('should create a new family in the DB', function (done) {
            supertest(sails.hooks.http.app)
                .post('/families')
                .send({ name: context.name, home_town: context.homeTown, email: context.email(1) })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.email).to.equal(context.email(1))
                    expect(res.body.homeTown).to.equal(context.homeTown)
                    expect(res.body.name).to.equal(context.name)
                    expect(res.body.id).to.exist
                    done()
                })
        })
        it('should fail to create a family when not all parameters are passed', function (done) {
            supertest(sails.hooks.http.app)
                .post('/families')
                .send({ name: context.name })
                .expect(500)
                .end((err, res) => {
                    expect(res.body.error).to.exist
                    expect(res.body.message).to.equal('Error creating new family')
                    expect(res.status).to.equal(500)
                    done()
                })
        })
    })
    describe('get', () => {
        it('should return the right record from the DB', (done) => {
            let createdFamily
            supertest(sails.hooks.http.app)
                .post('/families')
                .send({
                    name: context.name,
                    home_town: context.homeTown,
                    email: context.email(2) })
                .end((err, res) => {
                    createdFamily = res.body
                    supertest(sails.hooks.http.app)
                        .get(`/families/${createdFamily.id}`)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body).to.deep.equal(createdFamily)
                            done()
                        })
                })
        })
    })
})
