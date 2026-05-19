import express from 'express';
import axios from 'axios'; // Added
import User from '../models/userData.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- ROOM MANAGEMENT ---

router.post('/:roomId/save', verifyToken, async (req, res) => {
    const { roomId } = req.params;
    const { code } = req.body;
    const userId = req.user.id;

    try {
        // Move current room to top by pulling then pushing
        await User.findByIdAndUpdate(userId, {
            $pull: { recentRooms: { roomId: roomId } }
        });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    recentRooms: {
                        $each: [{ roomId, code, savedAt: new Date() }],
                        $position: 0, 
                        $slice: 3 
                    }
                }
            },
            { new: true }
        );

        res.status(200).json({ success: true, rooms: updatedUser.recentRooms });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ message: "Server error during save" });
    }
});

router.get('/recent', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('recentRooms');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user.recentRooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms" });
    }
});

// --- CODE EXECUTION ---

// Added verifyToken here to protect your API usage
// Removed verifyToken from here
router.post('/run-code', async (req, res) => {
    const { code, language } = req.body;

    // Mapping for GDB languages
    const langMap = {
        "python": "python3",
        "javascript": "nodejs",
        "java": "java",
        "c": "c",
        "cpp": "cpp17"
    };

    try {
        const response = await axios.post('https://www.onlinegdb.com/api/v1/run', {
            code: code,
            language: langMap[language] || "python3",
            input: ""
        });

        res.json({
            output: response.data.stdout || response.data.stderr,
            stderr: response.data.stderr
        });
    } catch (err) {
        console.error("GDB API Error:", err.message);
        res.status(500).json({ error: "All free engines are currently restricted." });
    }
});
export default router;