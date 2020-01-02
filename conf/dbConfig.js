
module.exports = {
    //We take MongoDB url and server's port from .env file
    url: process.env.DB_URL || "mongodb://localhost:27017/tournamentsDB",
    port: process.env.PORT  || 3000,
    host: process.env.HOST || "localhost:3000",
    weatherApiKey: process.env.weatherApiKey || '7eba8cd14bf98b9007cff30870cc8192',
    team_url: process.env.TEAM_URL || 'https://fis2019-teams.herokuapp.com'
}