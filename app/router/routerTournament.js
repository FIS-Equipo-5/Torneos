const tournamentController = require('../controllers/tournamentController');
module.exports = (app) => {
    app.get(BASE_API_PATH+'/tournaments', tournamentController.getAllTournaments);
    app.get(BASE_API_PATH+'/tournament/:id', tournamentController.getTournamentById);
    app.post(BASE_API_PATH+'/tournament/', tournamentController.postTournament);
}