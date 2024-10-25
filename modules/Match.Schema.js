const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,  // e.g., 'batsman', 'bowler', 'all-rounder', etc.
    },
    stats: {
        type: Map, // e.g., { "runs": 100, "wickets": 2 }
        of: Number,
    }
});

const matchSchema = new Schema({
    matchId: {
        type: Number, // Match ID from the EntitySport API
        required: true,
        unique: true, // Ensures the match is unique by its EntitySport match ID
    },
    matchType: {
        type: String, // e.g., T20, ODI, Test
        required: true,
    },
    teamA: {
        type: String,  // Team A name
        required: true,
    },
    teamB: {
        type: String,  // Team B name
        required: true,
    },
    matchDate: {
        type: Date, // Date of the match
        required: true,
    },
    matchStatus: {
        type: String,
        enum: ['upcoming', 'live', 'completed'], // Status of the match
        required: true,
    },
    playerList: [playerSchema],  // Array of players with role and stats
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
