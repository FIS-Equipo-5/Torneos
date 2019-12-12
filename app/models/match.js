const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
    match_id: {
        type: String,
        required: true,
        unique: true
    },
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

export default Match;
