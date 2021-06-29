import mongoose from 'mongoose';

const AdsUserTab = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
        sessionName: {
            type: String,
            index: true,
        },
        selectActivities: {
            type: String,
            index: true,
        },
        selectIntensityLevel: {
            type: String,
            index: true,
        },
        selectDays: {
            type: String,
            index: true,
       },
        description: {
            type: String,
            index: true,
       },
        price: {
            type: String,
            index:true
       },
        spotsAvailable: {
           type: String,
           
       },
        img: {
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

export default mongoose.model('AdsUserTab', AdsUserTab);