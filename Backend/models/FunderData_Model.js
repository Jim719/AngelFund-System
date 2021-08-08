import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FunderDataSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    investment_number: {
        type: String,
        required: true,
        trim: true,
    },
    investment_Duration: {
        type: String,
        required: true,
        trim: true,
    },   
    investment_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
    investment_Return: {
        type: Number,
        required: true,
        trim: true,
    },
})

const FunderData = mongoose.model("FunderData", FunderDataSchema, 'funder_data');

export default FunderData;