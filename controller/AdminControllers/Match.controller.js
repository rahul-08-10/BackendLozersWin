const Match = require('../../modules/Match.Schema');

// Add a new match
const addMatch = async (req, res) => {
    const { matchId, matchType, teamA, teamB, matchDate, matchStatus, playerList } = req.body;

    try {
        // Check if the match already exists
        const existingMatch = await Match.findOne({ matchId });
        if (existingMatch) {
            return res.status(400).json({
                success: false,
                message: "Match with this ID already exists."
            });
        }

        // Create a new match
        const newMatch = new Match({
            matchId,
            matchType,
            teamA,
            teamB,
            matchDate,
            matchStatus,
            playerList,
        });

        await newMatch.save();

        return res.status(201).json({
            success: true,
            message: "Match added successfully.",
            match: newMatch
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the match."
        });
    }
};

// Get all matches
const getMatches = async (req, res) => {
    try {
        const matches = await Match.find({});
        return res.status(200).json({
            success: true,
            matches
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the matches."
        });
    }
};

module.exports = { addMatch, getMatches };
