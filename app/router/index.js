module.exports = (app) => {
    app.get('/', (req, res) => res.send('<html><body><h1>Welcome to Tournaments microservice!</h1></body></html>'));
    require("./routerMatches")(app);
    require("./routerTournament")(app);
}