import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MatchingDataFunSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    Enterprise_ID: {
        type: String,
        required: true,
        trim: true,
    },  
    Project_Name: {
        type: String,
        required: true,
        trim: true,
    }, 
    Target_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
    Interest_Return: {
        type: Number,
        required: true,
        trim: true,
    },
})

const MatchingData_Fun = mongoose.model("MatchingData_Fun", MatchingDataFunSchema, 'matchingData_fun');

export default MatchingData_Fun;