const Match = require('../models/match');



module.exports.insertMatch = async function () {

    var match = new Match({
        tournamentUuid: '1',
        visitorTeamUuid: '1',
        localTeamUuid: '2',
        matchDate: new Date(),
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

    match = await match.save();
    return match.id;
}