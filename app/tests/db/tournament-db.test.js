const Tournament = require('../../models/tournament');
const mongoose = require('mongoose');
const dbConnect = require('../../../db');
const moment = require('moment');
const chai = require('chai');
const expect = chai.expect;

describe('Tournament DB connection', () => {
    let tournamentwritten;
    before(() => {
        return dbConnect();
    })

    before((done) => {
        Tournament.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a Tournament in the DB', (done) => {
        const tournament = new Tournament(
            {
                name: "tournament-test",
                type: "clasification",
                endDate: moment(),
                startDate: moment()
            }
        );
        tournament.save((err) => {
            expect(err).to.equal(null);
            Tournament.find({}, (err, tournament) => {
                tournamentwritten = tournament[0];
                expect(tournament).to.have.lengthOf(1);
                done();
            });
        });
    });


    it('find Tournament by id', (done) => {
        Tournament.findById(tournamentwritten._id, (err, tournament) => {
            expect(tournamentwritten._id.toString()).to.equal(tournament._id.toString());
            done();
        });
    });

    it('find and update Tournament by id', (done) => {
        Tournament.findByIdAndUpdate({ _id:tournamentwritten._id},{name:"new_name"},(err, tournament) => {
            Tournament.find({ _id:tournamentwritten._id}, (err, tournament) => {
                expect(tournament[0].name).to.equal("new_name")
                done();
            });
        });
    });

    it('update one Tournament by id', (done) => {
        Tournament.updateOne({ _id:tournamentwritten._id},{name:"another_name"},(err, tournament) => {
            Tournament.find({ _id:tournamentwritten._id}, (err, tournament) => {
                expect(tournament[0].name).to.equal("another_name")
                done();
            });
        })
    });



    it('delete Tournament by id', (done) => {
        Tournament.deleteOne({ _id:tournamentwritten._id},(err) => {
            Tournament.find({ _id:tournamentwritten._id}, (err, tournament) => {
                expect(tournament).to.have.lengthOf(0);
                done();
            });
        });
    });





    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})