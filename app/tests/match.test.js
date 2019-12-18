const app = require("../../index");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-http"));
chai.use(require('chai-like'));
chai.use(require('chai-things'));
describe("App Running!", () => {
    let idMatch
    it("Get Matches", done => {
        let bodyexpeted = {

            "stats": {
                "localScore": 3,
                "visitorScore": 1,
                "goals": [
                    {
                        "_id": "5dfa8e9081da9e16748d6687",
                        "player": "Joaquin",
                        "type": "free-kick",
                        "time": "15"
                    },
                    {
                        "_id": "5dfa8e9081da9e16748d6686",
                        "player": "Joaquin",
                        "type": "penalty-kick",
                        "time": "90"
                    }
                ],
                "cards": [
                    {
                        "_id": "5dfa8e9081da9e16748d6688",
                        "player": "Assunçao",
                        "type": "Yellow",
                        "time": "22"
                    }
                ]
            },
            "_id": "5dfa8e9081da9e16748d6685",
            "tournamentUuid": "1",
            "visitorTeamUuid": "1",
            "localTeamUuid": "2",
            "matchDate": "2019-12-18T20:39:44.373Z",
            "__v": 0

        }
        chai
            .request(app)
            .get(BASE_API_PATH + '/matches')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.contain.something.like(bodyexpeted)
                idTournament = res.body[0]["_id"]
                done();
            });
    });

    // it("Get a tournament", done => {
    //     chai
    //         .request(app)
    //         .get(BASE_API_PATH + '/tournaments/' + idTournament)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.have.property('_id').to.be.equal(idTournament);
    //             expect(res.body).to.have.property('name');
    //             expect(res.body).to.have.property('type');
    //             expect(res.body).to.have.property('endDate');
    //             expect(res.body).to.have.property('startDate');
    //             expect(res.body).to.have.property('clasification');
    //             done();
    //         });
    // });


    // it("Get a not found tournament", done => {
    //     let bodyexpeted = {
    //         name: "tournament1",
    //         type: "clasification",
    //         _id: idTournament
    //     }
    //     chai
    //         .request(app)
    //         .get(BASE_API_PATH + '/tournaments/1234' + idTournament)
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             done();
    //         });
    // });


})