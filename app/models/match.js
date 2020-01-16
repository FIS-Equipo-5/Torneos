const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const matchSchema = new mongoose.Schema({
    venue_city: {
        type: String,
        required: true
    },
    tournamentUuid: {
        type: String,
        required: true
    },
    visitorTeamUuid: {
        type: String
    },
    visitorTeamName: {
        type: String,
        required: true
    },
    localTeamUuid: {
        type: String
    },
    localTeamName: {
        type: String,
        required: true
    },
    matchDate: {
        type: Date,
        required: true
    },
    stats: {
        localScore: { type: Number, min: 0 },
        visitorScore: { type: Number, min: 0 },
        goals: [{
            player: { type: String },
            type: {
                type: String,
                enum: ['free-kick', 'penalty-kick', 'goal-kick'],
            },
            time: { type: String },
        }],
        cards: [{
            player: { type: String },
            type: {
                type: String,
                enum: ['Red', 'Yellow'],
            },
            time: { type: String },
        }]
    }

});
matchSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Match', matchSchema);