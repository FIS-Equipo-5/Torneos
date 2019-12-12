const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
   
    visitorTeamUuid: {
        type: String,
        required: true
    },
    homeTeamUuid: {
        type: String,
        required: true
    },
    matchDate: {
        type: Date,
        required: true
    }

});

module.exports = mongoose.model('Match', matchSchema);