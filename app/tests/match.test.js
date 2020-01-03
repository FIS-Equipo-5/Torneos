const chai = require("chai");
const nock = require("nock");
const config = require('../../conf/dbConfig');
const { expect } = chai;
let app = require("../../index");
var mongoose = require('mongoose');
const sinon = require("sinon");
const Match = require("../models/match");

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
let idTournament

chai.use(require('chai-nock'));
chai.use(require("chai-http"));
chai.use(require('chai-like'));
chai.use(require('chai-things'));

describe("MATCHES: GET methods", () => {
    it('should return all the matches', async function () {
        let mockedMatchesList = {
            lean: () => [{
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
            }
            ]

        };

        let expected = {

            visitorTeamUuid: "1",
            visitorTeamName: "Madrid",
            localTeamUuid: "2",
            localTeamName: "Sevilla",
            venue_city: "Madrid",
        };

        sinon.stub(mongoose.Model, 'find').returns(mockedMatchesList);

        chai
            .request(app)
            .get(BASE_API_PATH + '/matches')
            .end((err, res) => {
                expect(res).to.have.status(200);
                //expect(res.body.name).to.equal(bodyInsert.name);
                // expect(matchStub.calledOnce).to.be.true;
                expect(res.body).to.contain.something.like(expected);
                expect(res.body).to.have.lengthOf(2);
                // expect(res.body).to.have.property('venue_city');
                // expect(res.body).to.have.property('visitorTeamName');
                done();
            });

        // sinon.assert.calledWith(matchStub, expectedUser);
    });

    it('should return one match', async function () {
        let mockedMatchesList = {
            lean: () => ({
                "stats": {
                    "goals": [],
                    "cards": []
                },
                "tournamentUuid": "5dfb20c975b69a000fca37d9",
                "visitorTeamUuid": "1",
                "visitorTeamName": "Madrid",
                "localTeamUuid": "2",
                "localTeamName": "Bestis",
                "matchDate": "2020-01-04T23:27:44.576Z",
                "venue_city": "Madrid",
                "__v": 0,
                "weather": [{}]
            })
        };

        let expected = {

            visitorTeamUuid: "1",
            visitorTeamName: "betis",
            localTeamUuid: "2",
            localTeamName: "Sevilla",
            venue_city: "Madrid",
        };

        // sinon.stub(mongoose.Model, 'findById').returns(mockedMatchesList);

        chai
            .request(app)
            .get(BASE_API_PATH + '/match/5e0e8eb34f5955103cc763a0')
            .end((err, res) => {
                // expect(res).to.have.status(200);
                console.log('RES!!!!!!!!!')
                // expect(stub.calledOnce).to.be.true;

                //expect(res.body.name).to.equal(bodyInsert.name);
                // expect(matchStub.calledOnce).to.be.true;
                // expect(res.body).to.contain.something.like(expected);
                expect(res.body).to.have.property('heheh');
                expect(res.body.visitorTeamName).to.equal('sevilla');
                expect(res.body).to.have.property('visitorTeamName', expected.visitorTeamName);
                done();
            });

        // sinon.assert.calledWith(matchStub, expectedUser);
    });




    // it('should return one match by tournament', function () {
    //     let mockedMatchesList = {
    //         lean: () => ({
    //             "stats": {
    //                 "goals": [],
    //                 "cards": []
    //             },
    //             "tournamentUuid": "5dfb20c975b69a000fca37d9",
    //             "visitorTeamUuid": "1",
    //             "visitorTeamName": "Madrid",
    //             "localTeamUuid": "2",
    //             "localTeamName": "Sevilla",
    //             "matchDate": "2020-01-04T23:27:44.576Z",
    //             "venue_city": "Madrid",
    //             "__v": 0,
    //             "weather": [{}]
    //         })
    //     };

    //     let expected = {

    //         visitorTeamUuid: "1",
    //         visitorTeamName: "Madrid",
    //         localTeamUuid: "2",
    //         localTeamName: "Sevilla",
    //         venue_city: "Madrid",
    //     };

    //     sinon.stub(mongoose.Model, 'findById').returns(mockedMatchesList);

    //     chai
    //         .request(app)
    //         .get(BASE_API_PATH + '/matches')
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             //expect(res.body.name).to.equal(bodyInsert.name);
    //             // expect(matchStub.calledOnce).to.be.true;
    //             expect(res.body).to.contain.something.like(expected);
    //             expect(res.body).to.have.property('venue_city');
    //             expect(res.body).to.have.property('visitorTeamName');
    //             done();
    //         });

    //     // sinon.assert.calledWith(matchStub, expectedUser);
    // });


})