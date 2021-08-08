import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProjectDataSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    eventnumber: {
        type: String,
        required: true,
        trim: true,
    },
    project_Name: {
        type: String,
        required: true,
        trim: true,
    },
    project_Indtroduce: {
        type: String,
        required: true,
        trim: true,
    },
    project_Endday: {
        type: String,
        required: true,
        trim: true,
    },
    Target_Amount: {
        type: Number,
        required: true,
        trim: true,
    },
    interest_Return: {
        type: Number,
        required: true,
        trim: true,
    },
})

const ProjectData = mongoose.model("ProjectData", ProjectDataSchema, 'project_data');

export default ProjectData;