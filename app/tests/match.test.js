const chai = require("chai");
const { expect } = chai;
let app = require("../../index");
var mongoose = require('mongoose');
const sinon = require("sinon");

chai.use(require('chai-nock'));
chai.use(require("chai-http"));
chai.use(require('chai-like'));
chai.use(require('chai-things'));
let token;
describe("MATCHES: GET methods", () => {
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
    let mockedMatchesList = {
        lean: () => [
            {
                "stats": {
                    "goals": [],
                    "cards": []
                },
                "tournamentUuid": "5dfb20c975b69a000fca37d9",
                "visitorTeamUuid": "1",
                "visitorTeamName": "Madrid",
                "localTeamUuid": "2",
                "localTeamName": "Sevilla",
                "matchDate": "2020-01-04T23:27:44.576Z",
                "venue_city": "Madrid",
                "__v": 0,
                "weather": [{}]
            },
            {
                "stats": {
                    "goals": [],
                    "cards": []
                },
                "tournamentUuid": "5dfb20c975b69a000fca37d9",
                "visitorTeamUuid": "2",
                "visitorTeamName": "sevilla",
                "localTeamUuid": "1",
                "localTeamName": "betis",
                "matchDate": "2020-01-02T23:27:44.576Z",
                "venue_city": "Sevilla",
                "__v": 0,
                "weather": [{}]
            }]
    };

    let sandbox;
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });


    it('should return all the matches', done => {
        sandbox.stub(mongoose.Model, 'find').returns(mockedMatchesList);

        let expected = {
            visitorTeamUuid: "1",
            visitorTeamName: "Madrid",
            localTeamUuid: "2",
            localTeamName: "Sevilla",
            venue_city: "Madrid",
        };

        chai
            .request(app)
            .get(BASE_API_PATH + '/matches')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.contain.something.like(expected);
                expect(res.body).to.have.lengthOf(2);
                done();
            });
    });

    it('should return one match', done => {
        let mockedMatch = {
            lean: () => ({
                "stats": {
                    "goals": [],
                    "cards": []
                },
                "tournamentUuid": "5dfb20c975b69a000fca37d9",
                "visitorTeamUuid": "1",
                "visitorTeamName": "Madrid",
                "localTeamUuid": "2",
                "localTeamName": "Betis",
                "matchDate": "2020-01-04T23:27:44.576Z",
                "venue_city": "Madrid",
                "__v": 0,
                "weather": [{}]
            })
        };

        let expected = {
            visitorTeamUuid: "1",
            visitorTeamName: "Madrid",
            localTeamUuid: "2",
            localTeamName: "Sevilla",
            venue_city: "Madrid",
        };

        sandbox.stub(mongoose.Model, 'findById').returns(mockedMatch);

        chai
            .request(app)
            .get(BASE_API_PATH + '/match/1')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('visitorTeamName');
                expect(res.body.visitorTeamName).to.equal(expected.visitorTeamName);
                done();
            });
    });

    it('should return matches by tournament', done => {

        sandbox.stub(mongoose.Model, 'find').returns(mockedMatchesList);
        let expected = {
            visitorTeamUuid: "1",
            visitorTeamName: "Madrid",
            localTeamUuid: "2",
            localTeamName: "Sevilla",
            venue_city: "Madrid",
        };

        chai
            .request(app)
            .get(BASE_API_PATH + '/matches/1')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.contain.something.like(expected);
                expect(res.body).to.have.lengthOf(2);
                done();
            });

    });

    it('should return not found tournament', done => {
        sandbox.stub(mongoose.Model, 'find').returns(
            {
                lean: () => []
            });
        chai
            .request(app)
            .get(BASE_API_PATH + '/matches/3')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });

    });
})