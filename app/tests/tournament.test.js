const chai = require("chai");
const nock = require("nock");
const config = require('../../conf/dbConfig');
const { expect } = chai;
let app = require("../../index");
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
let idTournament

chai.use(require('chai-nock'));
chai.use(require("chai-http"));
chai.use(require('chai-like'));
chai.use(require('chai-things'));

let token;


describe("GET methods", () => {
    before((done) => {
        let data = {
            name: "test",
            email: "test@alumn.us.es",
            password: "tester1"
        }
        chai
        .request("https://fis-gr5-auth.herokuapp.com")
        .post("/api/v1/users/authenticate")
        .send(data)
        .end((err, res) => {
            token = res.body.data.token
            done();
        });
    })


    let idTournament;
    it("Get Tournaments", done => {
        let bodyexpeted = {
            name: "tournament1",
            type: "clasification",
        }
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournaments')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.contain.something.like(bodyexpeted);
                idTournament = res.body[0]["_id"]
                done();
            });
    });

    it("Get a tournament", done => {
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournament/' + idTournament)
            .set('x-access-token', token)
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
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });


})



describe("POST methods", () => {
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
            .set('x-access-token', token)
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
            .get(BASE_API_PATH + '/tournament/' + idTournament)
            .set('x-access-token', token)
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
            .set('x-access-token', token)
            .send(bodyInsert)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

})
describe("PUT methods", () => {
    let namechangedObj
    it("PUT Tournament", done => {
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
            .put(BASE_API_PATH + '/tournament/' + idTournament)
            .set('x-access-token', token)
            .send(bodyInsert)
            .end((err, res) => {
                expect(res).to.have.status(200);
                //expect(res.body.name).to.equal(bodyInsert.name);
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('endDate');
                expect(res.body).to.have.property('startDate');
                expect(res.body).to.have.property('clasification');
                namechangedObj = res.body.name
                done();
            });
    });


    it("GET Tournament after PUT", done => {
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournament/' + idTournament)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("PUT Bad request", done => {
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
            .put(BASE_API_PATH + '/tournament/' + idTournament)
            .set('x-access-token', token)
            .send(bodyInsert)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it("PUT Not Found", done => {
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
            .put(BASE_API_PATH + '/tournament/1nshsb')
            .set('x-access-token', token)
            .send(bodyInsert)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('PUT Initialized', (done) => {
        const responseThird = {
            team_id: 111,
            name: "Equipo",
            code: "773",
            logo: "https://media.api-football.com/teams/541.png",
            country: "Spain",
            founded: 1909,
            venue_name: "Estadio Benito Villamarín",
            venue_surface: "polvoraaa",
            venue_address: "Avenida de Concha Espina 1, Chamartín",
            venue_city: "Sevilla",
            venue_capacity: 85454,
            budget: 14423432,
            value: 9999999999
        }
        nock(config.team_url)
            .get('/api/v1/teams/team/111')
            .reply(200,responseThird);
        let bodyInsert = [111]

        chai
            .request(app)
            .put(BASE_API_PATH + '/tournament/initialize/'+ idTournament)
            .set('x-access-token', token)
            .send(bodyInsert)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });

    });


    it("GET Tournament after PUT initialize", done => {
        let bodyExpected =         {
            points: 0,
            team_id: "111",
            name: "Equipo",
            W: 0,
            D: 0,
            L: 0
        }
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournament/'+ idTournament)
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.clasification).to.contain.something.like(bodyExpected);
                done();
            });
    });

})

describe("DELETE methods", () => {

    it("DELETE Tournament", done => {

        chai
            .request(app)
            .delete(BASE_API_PATH + '/tournament/' + idTournament)
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                //expect(res.body.name).to.equal(bodyInsert.name);
                done();
            });
    });

    it("GET Tournament after DELETE", done => {
        chai
            .request(app)
            .get(BASE_API_PATH + '/tournament/' + idTournament)
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });


})