import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./confing/connectDB.js";
import adminRoute from "./route/adminRoute.js";
import certificateRoute from "./route/cartificateRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

connectDB();

app.use("/api/admin", adminRoute);
app.use("/api/certificate", certificateRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});