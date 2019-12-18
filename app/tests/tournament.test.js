const app = require("../../index");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-http"));
chai.use(require('chai-like'));
chai.use(require('chai-things'));
describe("App Running!", () => {
    let idTournament
    it("Get Tournaments", done => {
        let bodyexpeted = {
            name: "tournament1",
            type: "clasification",
        }
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournaments')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.contain.something.like(bodyexpeted)
                idTournament = res.body[0]["_id"]
                done();
            });
    });

    it("Get a tournament", done => {
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournaments/' + idTournament)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('_id').to.be.equal(idTournament);
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('endDate');
                expect(res.body).to.have.property('startDate');
                expect(res.body).to.have.property('clasification');
                done();
            });
    });


    it("Get a not found tournament", done => {
        let bodyexpeted = {
            name: "tournament1",
            type: "clasification",
            _id: idTournament
        }
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournaments/1234' + idTournament)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });


})