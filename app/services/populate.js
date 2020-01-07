const Tournament = require('../models/tournament');
const Match = require('../models/match.js');
const { logger } = require('../utils');
const moment = require('moment');

module.exports.populate = async function () {

    //TODO: check if BD has been inicialized before hand 
    logger.info("Populating DB");
    const tournament = new Tournament({
        name: "tournament1",
        type: "clasification",
        endDate: moment(),
        startDate: moment()
    });

    await tournament.save().catch((error) => logger.warn("Dummy Tournament already created"))


    const match1 = new Match({
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

    await match1.save().catch((error) => logger.warn("Dummy match already created"));

    const match2 = new Match({
        venue_city: 'Barcelona',
        tournamentUuid: '1',
        visitorTeamUuid: '2',
        visitorTeamName: 'Madrid',
        localTeamUuid: '1',
        localTeamName: 'barcelona',
        matchDate: moment('2020-01-09 13:00:00'),
        stats: {}
    });

    await match2.save().catch((error) => logger.warn("Dummy match already created"));

    const match3 = new Match({
        venue_city: 'madrid',
        tournamentUuid: '2',
        visitorTeamUuid: '20',
        visitorTeamName: 'betis',
        localTeamUuid: '10',
        localTeamName: 'madrid',
        matchDate: moment('2020-01-08 13:00:00'),
        stats: {}
    });

    await match3.save().catch((error) => logger.warn("Dummy match already created"));
}