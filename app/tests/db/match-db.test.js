const Match = require('../../models/match');
const mongoose = require('mongoose');
const dbConnect = require('../../../db');
const moment = require('moment');
const chai = require('chai');
const expect = chai.expect;

describe('Matches DB connection', () => {
    let matchwritten;
    before(() => {
        return dbConnect();
    })

    before((done) => {
        Match.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a match in the DB', (done) => {
        const match = new Match({
            venue_city: 'sevilla',
            tournamentUuid: '1',
            visitorTeamUuid: '1',
            visitorTeamName: 'Madrid',
            localTeamUuid: '2',
            localTeamName: 'Sevilla',
            matchDate: moment('2020-01-10 13:00:00'),
            stats: {
                localScore: 3,
                visitorScore: 1,
                goals: [{
                    player: "Joaquin",
                    type: "free-kick",
                    time: "15",
                },
                {
                    player: "Joaquin",
                    type: "penalty-kick",
                    time: "90",
                }],
                cards: [{
                    player: "Assunçao",
                    type: "Yellow",
                    time: 22,
                }]
            }
        });
        match.save((err) => {
            expect(err).to.equal(null);
            Match.find({}, (err, match) => {
                matchwritten = match[0];
                expect(match).to.have.lengthOf(1);
                done();
            });
        });
    });


    it('find match by id', (done) => {
        Match.findById(matchwritten._id, (err, match) => {
            expect(matchwritten._id.toString()).to.equal(match._id.toString());
            done();
        });
    });

    it('find and update match by id', (done) => {
        Match.findByIdAndUpdate({ _id:matchwritten._id},{venue_city:"new_city"},(err, match) => {
            Match.find({ _id:matchwritten._id}, (err, match) => {
                expect(match[0].venue_city).to.equal("new_city")
                done();
            });
        })
    });

    it('update one match by id', (done) => {
        Match.updateOne({ _id:matchwritten._id},{venue_city:"another_city"},(err, match) => {
            Match.find({ _id:matchwritten._id}, (err, match) => {
                expect(match[0].venue_city).to.equal("another_city")
                done();
            });
        })
    });



    it('delete match by id', (done) => {
        Match.deleteOne({ _id:matchwritten._id},(err) => {
            Match.find({ _id:matchwritten._id}, (err, match) => {
                expect(match).to.have.lengthOf(0);
                done();
            });
        })
    });





    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})