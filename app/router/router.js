module.exports = (app) => {

    const matchController = require('../controllers/matchController');
    const BASE_API_PATH = "/api/v1"
    
    // MATCH
    app.get('/', (request, response) => response.send('<html><body><h1>Welcome to Tournaments microservice!</h1></body></html>'));
    app.get(BASE_API_PATH + "/matches", matchController.getAllMatches);
    app.get(BASE_API_PATH + "/match/:id", matchController.getMatchById);

    // app.post(BASE_API_PATH+"/match",matchController.postMatch);

    // app.put(BASE_API_PATH+"/match/:match_id",matchController.updateMatch);
    app.put(BASE_API_PATH + "/match", matchController.updateMatch);
    app.put(BASE_API_PATH + "/match/:id/stats", matchController.updateMatchStats);

    app.delete(BASE_API_PATH + "/match", matchController.deleteMatchById);
    app.delete(BASE_API_PATH + "/match/:tournament_id", matchController.deleteAllMatchesByTournamentId);
}