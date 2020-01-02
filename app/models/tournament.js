const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const matchSchema = new mongoose.Schema({

    clasification: [{
        points: {
            type: Number,
            required: true
        },
        team_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        W: {
            type: Number,
            required: true
        },
        D: {
            type: Number,
            required: true
        },
        L: {
            type: Number,
            required: true
        }
    }
    ],
    description: {
        type: String,
        required: false
    },
    name: {
        unique: true,
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    type: {
        type: String,
        enum: ['clasification', 'playoff'],
        required: true
    }


});

matchSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Tournament', matchSchema);