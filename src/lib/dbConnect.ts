// import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({
   path:'@/src/.env'
})
import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number
};

const connection: connectionObject = {};

export default async function dbConnect(): Promise<void> {
    try {
        if (connection.isConnected) {
            console.log("Already connected to database...")
            return
        }
        const db = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Riya:riya07@riyadb.etbfj.mongodb.net", {
         
        } );
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected succesfully.")
    } catch (error) {
        console.log(error)
        console.error("DB connection failed");
        process.exit(1);
    }
}