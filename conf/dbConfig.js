
module.exports = {
    //We take MongoDB url and server's port from .env file
    url: process.env.DB_URL || "mongodb://localhost:21017/",
    port: process.env.PORT 
}