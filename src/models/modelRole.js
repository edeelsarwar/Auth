import mongoose from 'mongoose';

const ModelRole = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
        name: {
            type: String,
            index: true,
        },
        prefix: {
            type: String,
            index: true,
        },
        gender: {
            type: String,
            index: true,
        },
        age: {
            type: String,
            index: true,
       },
        height: {
            type: String,
            index: true,
       },
        weight: {
            type: String,
            index:true
       },
        bodyType: {
           type: String,
           
       },
        ethnicity: {
            type: String
        },
        skinTone: {
            type: String
        },
        eyeColor: {
            type: String
        },
        hairLength: {
            type: String
        },
        tatoos: {
            type: String
        },
        piecings: {
            type: String
        },
        experience: {
            type: String
        },
        lanuages: {
            type: String
        },
        workingWithMedia: {
            type: String
        },
        modelingIntersts: {
            type: String
        },
        compensation: {
            type: String
        },
        notesAboutCompensation: {
            type: String
        },
        activities: {
            type: String
        },
        aboutMe: {
            type: String
        },
        productReviews: {
            type: String
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

export default mongoose.model('ModelRole', ModelRole);