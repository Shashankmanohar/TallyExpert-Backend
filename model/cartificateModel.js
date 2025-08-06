import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    passingYear: {
        type: String,
        required: true
    },
    certificateNumber: {
        type: String,
        required: true
    }
})

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;