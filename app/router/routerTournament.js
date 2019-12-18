const tournamentController = require('../controllers/tournamentController');
module.exports = (app) => {
    app.get(BASE_API_PATH+'/tournaments', tournamentController.getAllTournaments);
    app.get(BASE_API_PATH+'/tournaments/:id', tournamentController.getTournamentById);
}