const Tournament = require('../models/tournament');

let _getAllTournaments = async (req, res) => {
    let tournaments = await Tournament.find()
    res.send(tournaments);
};

let _getTournamentById = async (req, res) => {
    let tournaments = await Tournament.findById(req.params.id)
    console.log(tournaments)
    if (!tournaments) {
        res.send(404)
    } else {
        res.send(tournaments);
    }
};

module.exports = {
    getAllTournaments: _getAllTournaments,
    getTournamentById: _getTournamentById

}