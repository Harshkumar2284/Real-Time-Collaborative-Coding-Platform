import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        
        // Define recentRooms as an array of objects
        recentRooms: [
        {
            roomId: { type: String, required: true },
            code: { type: String },
            savedAt: { type: Date, default: Date.now }
        }
    ]
    },
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;