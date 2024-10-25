const Contest = require('../../modules/contest.Schema'); // The Contest model
const Match = require('../../modules/Match.Schema');  // Assuming Match is defined
const userDetails = require('../../modules/userLogin.Schema');  // Assuming User is defined

const createContest = async (req, res) => {
    const { matchId, contestType, entryFee, prizePool, maxParticipants, prizeDistribution } = req.body;

    try {
        // Validate if the match exists
        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found.",
            });
        }

        // Validate prize distribution
        let totalPrize = 0;
        Object.values(prizeDistribution).forEach(prize => {
            totalPrize += prize;
        });
        
        if (totalPrize > prizePool) {
            return res.status(400).json({
                success: false,
                message: "Total prize distribution exceeds prize pool.",
            });
        }

        // Create a new contest
        const newContest = new Contest({
            matchId,
            contestType,
            entryFee,
            prizePool,
            maxParticipants,
            prizeDistribution
        });

        await newContest.save();

        return res.status(201).json({
            success: true,
            message: "Contest created successfully.",
            contest: newContest
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the contest.",
        });
    }
};

module.exports = { createContest };
