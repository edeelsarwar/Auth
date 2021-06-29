import mongoose from 'mongoose';

const centerRole = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    
        openSince: {
            type: String,
            index: true,
        },
        fitnessCenterType: {
            type: String,
            index: true,
        },
        languages: {
            type: String,
            index: true,
        },
        specialities: {
            type: String,
            index: true,
       },
        hoursOfOpertion: {
            type: String,
            index: true,
       },
        membershipPlan: {
            type: String,
            index:true
       },
        accomplishments: {
           type: String,
           
       },
        ourFitnessPros: {
            type: String
        },
        aboutUs: {
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

export default mongoose.model('centerRole', centerRole);