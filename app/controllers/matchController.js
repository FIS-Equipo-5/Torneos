


const Match = require('../models/match');
const logger = require('../utils/logger');
const mongoose = require('mongoose');
const matchService = require('../services/matchService')


//GET
module.exports.getAllMatches = async function (request, response) {

    try {
        let matches = await Match.find().lean();

        for (let match of matches) {
            let weather = await matchService.getWeather(match);
            match.weather = weather;
        }
        response.send(matches);

    } catch (err) {
        logger.error("ERROR: GET /matches , Some error occurred while retrieving matches")
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving matches."
        });
    };
};

module.exports.getMatchById = async function (request, response) {
    try {
        let match = await Match.findById(request.params.match_id).lean()

        if (!match) {
            logger.error(`ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`);
            return response.status(404).send({
                message: "Match not found with id " + request.params.match_id
            });
        }
        logger.info(match.visitorTeamName + ' ' + match.localTeamName);
        let weather = await matchService.getWeather(match);
        match.weather = weather;
        logger.info(`SUCCESS: -GET /match/${request.params.match_id}`)

        response.send(match);

    } catch (err) {
        if (err.kind === 'ObjectId') {
            logger.error(` ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`)
            return response.status(404).send({
                message: "Match not found with id " + request.params.match_id
            });
        }
        logger.error(`ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`)
        return response.status(500).send({
            message: "Error retrieving match with id " + request.params.match_id
        });
    }

};

module.exports.getMatchByTournamentId = async function (request, response) {
    try {

        let matches = await Match.find({ tournamentUuid: request.params.tournament_id }).lean();
        for (let match of matches) {
            let weather = await matchService.getWeather(match);
            match.weather = weather;
        }
        if(!matches.length){
            return response.status(404).send({
                message: "tournament not found with id " + request.params.tournament_id
            });    
        }
        response.send(matches);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            logger.error(` ERROR: -GET /matches/${request.params.tournament_id} - Not found tournament with id: ${request.params.tournament_id}`)
            return response.status(404).send({
                message: "tournament not found with id " + request.params.tournament_id
            });
        }
        logger.error(`ERROR: -GET /tournament/${request.params.tournament_id} - Not found tournament with id: ${request.params.tournament_id}`)
        return response.status(500).send({
            message: "Error retrieving tournament with id " + request.params.tournament_id
        });
    }
}

//PUT
module.exports.updateMatch = async function (request, response) {
    try {
        if (!mongoose.Types.ObjectId.isValid(request.params.match_id)) {
            response.status(404);
            response.json({ message: "Not Found" });
            return
        }
        // await Match.updateOne({ _id: request.params.match_id }, request.body);
        let match = await Match.findByIdAndUpdate({ _id: request.params.match_id }, request.body, {
            new: true
        });
        if (!match) {
            response.status(404);
            response.json({ message: "Not Found" });
            return
        } else {
            response.status(200);
            response.json(match);
            return
        }

    } catch (error) {
        logger.error(error);
        response.status(500);
        response.json({ message: "Internal Error" });
        return

    }

};

// module.exports.updateMatchStats = function (request, response) {
// };

//DELETE
module.exports.deleteMatchById = async function (request, response) {
    try {
        if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
            response.status(404);
            response.json({ message: "Not Found" });
            return
        }
        let result = await Match.deleteOne({ _id: request.params.id });
        if (result.n == 0) {
            response.status(404);
            response.json({ message: "Not Found" });
            return
        }
        response.status(200);
        response.json({ message: "Deleted" });
        return
    } catch (error) {
        logger.error(error);
        response.status(500);
        response.json({ message: "Internal Error" });
        return
    }
};
