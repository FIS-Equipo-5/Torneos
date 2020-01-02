const Tournament = require('../models/tournament');
const logger = require('../utils/logger');
const request = require('request-promise');
const config = require('../../conf/dbConfig');
let mongoose = require('mongoose');

let _getAllTournaments = async (req, res) => {
    let tournaments = await Tournament.find()
    res.json(tournaments);
};

let _getTournamentById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404);
            res.json({ message: "Not Found" });
            return
        } else {
            let tournaments = await Tournament.findById(req.params.id)
            if (!tournaments) {
                res.status(404);
                res.json({ message: "Not Found" });
                return
            } else {
                res.json(tournaments);
                return
            }
        }
    } catch (error) {
        logger.error(error);
        res.sendStatus(500).json({ message: "Internal Error" });
    }

};

let _postTournament = async (req, res) => {
    let tournaments = new Tournament(req.body)
    try {
        let response = await tournaments.save()
        res.status(201);
        res.json(response);
    } catch (error) {
        if (error.errors.name.kind == "required") {
            res.status(400);
            res.json({ message: "Bad Request" });
        } else if (error.errors.name.kind == "unique") {
            res.status(409);
            res.json({ message: "Conflict" });
        } else {
            logger.error(error);
            res.status(500);
            res.json({ message: "Internal Error" });
        }
    }
};


let _putTournamentById = async (req, res) => {
    if (!checkBody(req.body)) {
        res.status(400);
        res.json({ message: "Bad Request" });
        return
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404);
            res.json({ message: "Not Found" });
            return
        }
        await Tournament.updateOne({ _id: req.params.id }, req.body);
        let tournament = await Tournament.findById({ _id: req.params.id }, req.body);
        if (!tournament) {
            res.status(404);
            res.json({ message: "Not Found" });
            return
        } else {
            res.status(200);
            res.json(tournament);
            return
        }

    } catch (error) {
        logger.error(error);
        res.status(500);
        res.json({ message: "Internal Error" });
        return

    }
};

let _deleteTournamentById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404);
            res.json({ message: "Not Found" });
            return
        }
        let result = await Tournament.deleteOne({ _id: req.params.id });
        if (result.n == 0) {
            res.status(404);
            res.json({ message: "Not Found" });
            return
        }
        res.status(200);
        res.json({ message: "Deleted" });
        return;
    } catch (error) {
        logger.error(error);
        res.status(500);
        res.json({ message: "Internal Error" });
        return;

    }
};



let checkBody = (body) => {
    if (body.name && body.startDate && body.endDate && body.clasification && body.type
        && (body.type == "clasification" || body.type == "playoff")) {
        return true;
    }
    return false;
}


let _initialize = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        res.json({ message: "Not Found" });
        return
    }
    let tournament = await Tournament.findById({ _id: req.params.id }, req.body);
    if (!tournament) {
        res.status(404);
        res.json({ message: "Not Found" });
        return
    }
    let teams = []
    for (let team of req.body) {
        try {
            let teaminfo = await request(config.team_url + '/api/v1/teams/team/' + team)
            teaminfo = JSON.parse(teaminfo)
            let teamTosave = {
                points: 0,
                team_id: teaminfo.team_id,
                name: teaminfo.name,
                W: 0,
                D: 0,
                L: 0,
                venue_name: teaminfo.venue_name
            }
            teams.push(teamTosave)
        } catch {
            continue
        }

    }
    require('../services/matchService').generateMatches(req.params.id, teams);
    await Tournament.updateOne({ _id: req.params.id }, { clasification: teams });
    res.json({ message: "Initialized" });

}


module.exports = {
    getAllTournaments: _getAllTournaments,
    getTournamentById: _getTournamentById,
    postTournament: _postTournament,
    putTournamentById: _putTournamentById,
    initialize: _initialize,
    deleteTournamentById: _deleteTournamentById

}