import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    ID_OR_CompanyNunumber: {
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
        trim: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    Charger: {
        type: String,
        required: true,
        trim: true,
    },
})

const Account = mongoose.model("Account", AccountSchema, 'account');

export default Account;