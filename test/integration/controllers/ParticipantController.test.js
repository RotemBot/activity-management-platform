// test/integration/controllers/UserController.test.js
var supertest = require('supertest');

describe('ParticipantController', () => {

    describe('create', () => {
        it('should create a new participant in the DB', function (done) {
            supertest(sails.hooks.http.app)
                .post('/users/login')
                .send({ name: 'test', password: 'test' })
                .expect(302)
                .expect('location','/my/page', done);
        });
    });

});
