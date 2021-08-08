import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FunderWalletSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    Project_Name: {
        type: String,
        required: true,
        trim: true,
    },
    Investment_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
    Current_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
    Interest_Receivable: {
        type: Number,
        required: true,
        trim: true,
    },
})

const FunderWallet = mongoose.model("FunderWallet", FunderWalletSchema, 'funder_wallet');

export default FunderWallet;