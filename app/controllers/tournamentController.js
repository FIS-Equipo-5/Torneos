const Tournament = require('../models/tournament');
const logger = require('../utils/logger');
let mongoose = require('mongoose');

let _getAllTournaments = async (req, res) => {
    let tournaments = await Tournament.find()
    res.json(tournaments);
};

let _getTournamentById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(404);
            res.json({ message: "Not Found" });
        }else{
            let tournaments = await Tournament.findById(req.params.id)
            if (!tournaments) {
                res.status(404);
                res.json({ message: "Not Found" });
            } else {
                res.json(tournaments);
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
        if (error.errors.name.kind == "required"){
            res.status(400);
            res.json({ message: "Bad Request" });
        }else if (error.errors.name.kind == "unique"){
            res.status(409);
            res.json({ message: "Conflict" });
        }else{
            res.status(500);
            res.json({ message: "Internal Error" });
        }
    }
};



module.exports = {
    getAllTournaments: _getAllTournaments,
    getTournamentById: _getTournamentById,
    postTournament: _postTournament

}