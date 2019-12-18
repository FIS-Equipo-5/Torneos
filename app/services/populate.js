const Tournament = require('../models/tournament');
const Match = require('../models/match.js');
const moment = require("moment");

module.exports.populate = async function () {

    //TODO: check if BD has been inicialized before hand 

    const tournament = new Tournament({
        name: "tournament1",
        type: "clasification",
        endDate: moment(),
        startDate: moment()
    });

    await tournament.save().catch((error) => logger.warn("Dummy Tournament already created"))


    const match = new Match({
        tournamentUuid: '1',
        visitorTeamUuid: '1',
        localTeamUuid: '2',
        matchDate: moment(),
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

    await match.save().catch((error) => logger.warn("Dummy match already created"));
}