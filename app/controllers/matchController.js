


const Match = require('../models/match');
const logger = require('../utils/logger');
const mongoose = require('mongoose');
const matchService = require('../services/matchService')


//GET
module.exports.getAllMatches = async function (request, response) {

    try {
        let numperpages = parseInt(request.query['limit']) || 5;
        let page = parseInt(request.query['page']) || 1;
        let token = request.headers['x-access-token'];
        let numMatches = await Match.count();
        let matches = await Match.find()
            .skip((numperpages * page) - numperpages)
            .limit(numperpages)
            .lean();


        for (let match of matches) {
            let weather = await matchService.getWeather(match);
            match.weather = weather;
        }
        response.send({ matches: matches, totalPages: Math.ceil(numMatches / numperpages) });

    } catch (err) {
        logger.error("ERROR: GET /matches , Some error occurred while retrieving matches")
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving matches."
        });
    };
};

module.exports.getMatchById = async function (request, response) {
    try {
        let token = request.headers['x-access-token'];
        if (!mongoose.Types.ObjectId.isValid(request.params.match_id)) {
            response.status(400);
            response.json({ message: "ID not valid" });
            return
        }

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
        let numperpages = parseInt(request.query['limit']) || 5;
        let page = parseInt(request.query['page']) || 1;
        let token = request.headers['x-access-token'];
        let matches = await Match.find({ tournamentUuid: request.params.tournament_id })
            .skip((numperpages * page) - numperpages)
            .limit(numperpages)
            .lean();
        for (let match of matches) {
            let weather = await matchService.getWeather(match);
            match.weather = weather;
        }
        if (!matches.length) {
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
        let token = request.headers['x-access-token'];
        if (!mongoose.Types.ObjectId.isValid(request.params.match_id)) {
            response.status(400);
            response.json({ message: "ID not valid" });
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

module.exports.updateMatchStats = async function (request, response) {
    try {
        let token = request.headers['x-access-token'];
        if (!mongoose.Types.ObjectId.isValid(request.params.match_id)) {
            response.status(400);
            response.json({ message: "ID not valid" });
            return
        }
        let result = await Match.updateOne({ _id: request.params.match_id }, { stats: request.body.stats });
        if (result.n == 0) {
            response.status(404);
            response.json({ message: "Not Found" });
            return
        }
        response.status(204);
        response.json({ message: "resource updated successfully" });
        return
    } catch (err) {
        response.status(500);
        response.json({ message: "Internal Error" });
        return
    }
};

//DELETE
module.exports.deleteMatchById = async function (request, response) {
    try {
        let token = request.headers['x-access-token'];
        if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
            response.status(400);
            response.json({ message: "ID not valid" });
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
