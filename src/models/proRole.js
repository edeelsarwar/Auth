import mongoose from 'mongoose';

const ProRole = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    business:{

        businesName: {
            type: String,
            index: true,
        },
        clientPreference: {
            type: String,
            index: true,
        },
        availablityForHome: {
            type: String,
            index: true,
        },
        availiabilityLive: {
            type: String,
            index: true,
       },
        trainingRates: {
            type: String,
            index: true,
       },
        noteAboutTrainRate: {
            type: String,
            index:true
       },
    },

    qualifications:{

        Degrees: {
           type: String,  
        },
        professions: {
            type: String
        },
        experience: {
            type: String
        },
        certifications: {
            type: String
        },
        sepcialties: {
            type: String
        },
        languages: {
            type: String
        },
        trainingMethod: {
            type: String
        },
        FitnessAwards: {
            type: String
        },
    
    },

    personal: {
        name: {
            type: String
        },
        profileUrl: {
            type: String
        },
        gender: {
            type: String
        },
        age: {
            type: String
        },
        height: {
            type: String
        },
        weight: {
            type: String
        },
        dietType: {
            type: String
        },
        bodyType: {
            type: String
        },
        activities: {
            type: String
        },
        aboutme: {
            type: String
        },
        prodcutReview: {
            type: String
        },
        sponsorImg: {
            type: String
        },
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

export default mongoose.model('ProRole', ProRole);