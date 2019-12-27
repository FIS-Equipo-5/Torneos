


const Match = require('../models/match');
const logger = require('../utils/logger');
const mongoose = require('mongoose');
const matchService = require('../services/matchService')


//GET
module.exports.getAllMatches = function (request, response) {

    Match.find().lean().then(async (matches) => {

        for (let match of matches) {
            let weather = await matchService.getWeather(match);
            match.weather = weather;
        }
        response.send(matches);
    }).catch(err => {
        logger.error("ERROR: GET /matches , Some error occurred while retrieving matches")
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving matches."
        });
    });
};

module.exports.getMatchById = function (request, response) {

    Match.findById(request.params.match_id).lean()
        .then(async (match) => {
            if (!match) {
                logger.error(`ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`);
                return response.status(404).send({
                    message: "Match not found with id " + request.params.match_id
                });
            }
            logger.info(`SUCCESS: -GET /match/${request.params.match_id}`)
            let weather = await matchService.getWeather(match);
            match.weather = weather;
            response.send(match);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                logger.error(` ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`)
                return response.status(404).send({
                    message: "Match not found with id " + request.params.match_id
                });
            }
            log.error(`ERROR: -GET /match/${request.params.match_id} - Not found match with id: ${request.params.match_id}`)
            return response.status(500).send({
                message: "Error retrieving match with id " + request.params.match_id
            });
        });

};

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

module.exports.updateMatchStats = function (request, response) {
};

module.exports.deleteMatchById = function (request, response) {
};

module.exports.deleteAllMatchesByTournamentId = function (request, response) {
};

function checkMatch(match) {
    // Una transferencia es válida si contiene todos sus atributos
    // return transfer.destiny_team_id!=null 
    //     && transfer.origin_team_id!=null 
    //     && transfer.transfer_date!=null 
    //     && transfer.cost!=null 
    //     && transfer.player_id!=null;
}