import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProjectWalletSchema = new Schema({
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
    Target_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
    Current_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
    Interest_Payable: {
        type: Number,
        required: true,
        trim: true,
    },
})

const ProjectWallet = mongoose.model("ProjectWallet", ProjectWalletSchema, 'project_wallet');

export default ProjectWallet;