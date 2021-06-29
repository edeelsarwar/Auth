import mongoose from 'mongoose';
const Comments = new mongoose.Schema({
    hashTags: [{
        type: String
    }],
    mentions: [{
        type: String
    }],
    text: { 
        type: String,
        required: [true, 'Please enter comment text']
    },
    userId: mongoose.Types.ObjectId,
    timestamp: Number,
    updatedAt:Number
}, { 
    timestamps: { 
        createdAt: 'timestamp',
        currentTime: () => Math.floor(Date.now() / 1000)
    }
 });

export default mongoose.model('Comments', Comments);
