import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MatchingDataProSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    Funder_ID: {
        type: String,
        required: true,
        trim: true,
    },  
    investment_Return: {
        type: Number,
        required: true,
        trim: true,
    },
    investment_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
})

const MatchingData_Pro = mongoose.model("MatchingData_Pro", MatchingDataProSchema, 'matchingData_pro');

export default MatchingData_Pro;