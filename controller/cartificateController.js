import Certificate from "../model/cartificateModel.js";

const createCertificate = async (req, res) => {
 try {
    
    const { studentName, fatherName, dateOfBirth, rollNo, passingYear, certificateNumber, courseOfDuration, courseName } = req.body;
    if (!studentName || !fatherName || !dateOfBirth || !rollNo || !passingYear || !certificateNumber || !courseOfDuration || !courseName) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const existingCertificate = await Certificate.findOne({ certificateNumber });
    if (existingCertificate) {
        return res.status(400).json({ message: "Certificate already exists" });
    }
    
    const certificate = new Certificate({ 
        studentName, 
        fatherName, 
        dateOfBirth: new Date(dateOfBirth), // Convert string to Date object
        rollNo, 
        passingYear, 
        certificateNumber, 
        courseOfDuration, 
        courseName 
    });
    
    await certificate.save();
    res.status(201).json({ message: "Certificate created successfully", certificate });
 } catch (error) {
    console.error('Error creating certificate:', error); // Debug log
    res.status(500).json({ message: error.message });
 }
}

const getOneCertificate = async (req, res) => {
    try {
        const { studentName, fatherName, dateOfBirth, certificateNumber, } = req.query;
        if (!studentName || !fatherName || !dateOfBirth || !certificateNumber) {
            return res.status(400).json({ message: "All fields are required for verification" });
        }
        const certificate = await Certificate.findOne({
            studentName,
            fatherName,
            dateOfBirth: new Date(dateOfBirth),
            certificateNumber
        });
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        res.status(200).json({ certificate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find();
        res.status(200).json({ certificates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Certificate.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createCertificate, getOneCertificate, getAllCertificates, deleteCertificate };