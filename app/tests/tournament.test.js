const chai = require("chai");
const { expect } = chai;
let app = require("../../index");
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');


chai.use(require("chai-http"));
chai.use(require('chai-like'));
chai.use(require('chai-things'));





describe("GET methods", () => {
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
            .get(BASE_API_PATH + '/tournament/' + idTournament)
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
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournament/1234' + idTournament)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });


})



describe("POST methods", () => {
    let idTournament
    it("POST Tournament", done => {
        const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
        let bodyInsert = {
            name: randomName,
            type: "clasification",
            endDate: "2019-12-16T19:09:37.935Z",
            startDate: "2019-12-16T19:09:37.936Z",
            clasification: [],
        }
        chai
            .request(app)
            .post(BASE_API_PATH + '/tournament')
            .send(bodyInsert)
            .end((err, res) => {
                expect(res).to.have.status(201);
                //expect(res.body.name).to.equal(bodyInsert.name);
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('endDate');
                expect(res.body).to.have.property('startDate');
                expect(res.body).to.have.property('clasification');
                idTournament = res.body["_id"]
                done();
            });
    });


    it("GET Tournament after POST", done => {
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournament/'+idTournament)
            .end((err, res) => {
                expect(res).to.have.status(200);
                //expect(res.body.name).to.equal(bodyInsert.name);
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('endDate');
                expect(res.body).to.have.property('startDate');
                expect(res.body).to.have.property('clasification');
                done();
            });
    });

    it("POST Wrong Tournament", done => {
        const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
        let bodyInsert = {
            iname: randomName,
            type: "clasification",
            endDate: "2019-12-16T19:09:37.935Z",
            startDate: "2019-12-16T19:09:37.936Z",
            clasification: [],
        }
        chai
            .request(app)
            .post(BASE_API_PATH + '/tournament')
            .send(bodyInsert)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

})
