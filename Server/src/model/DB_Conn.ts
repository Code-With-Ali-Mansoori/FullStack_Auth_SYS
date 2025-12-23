import mongoose from "mongoose";

export const DB_Connection = async (MONGO_URI : string):Promise<void>  => {
    try {
        
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file");
        };

        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully 🚀");

    } catch (error) {
        console.log("MongoDB connection Failed ⚠️ ", error);

    }
};

