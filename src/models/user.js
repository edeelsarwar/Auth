import mongoose from 'mongoose';

const User = new mongoose.Schema({
    
        name: {
            type: String,
            required: [true, 'Please enter name'],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            index: true,
            select: false
       },
        location: {
            type: String,
            index: true,
       },
        role: {
            type: String,
            required: [true, 'Please enter a role']
       },
        activeUserRole: {
           type: String,
           
       },
    timestamp: Number,
    updatedAt:Number
}, { 
    timestamps: { 
        createdAt: 'timestamp',
        currentTime: () => Math.floor(Date.now() / 1000)
    }
 });

// although index is not required for firstName, lastName in this demo because there is no api for fetching the result accoring to these fields
// but in real-scenerios these things should be indexed for better searching, so leaving the index for now

export default mongoose.model('User', User);